import { FellowshipUnion, FELLOWSHIP_ENUM } from "graphql/db";

export function composeNewsPiecesQuery(fellowship: FellowshipUnion = "all") {
  // Founders and angels are interested in new founders' projects.
  // Writers want to connect only to other writers and are not interested in founders' projects.
  const hasProjects =
    fellowship === FELLOWSHIP_ENUM.founders ||
    fellowship === FELLOWSHIP_ENUM.angels ||
    fellowship === FELLOWSHIP_ENUM.all;

  const shouldFilterUsers = fellowship !== FELLOWSHIP_ENUM.all;
  return `
          ${hasProjects ? WITH_PROJECT_TABLE : ""}
                 SELECT     a.id           id,
                            'announcement' news_type,
                            a.title        title,
                            a.body         description,
                            NULL           img_url,
                            a.fellowship   fellowship,
                            a.created_ts   created
                   FROM     announcements a
                  WHERE     fellowship = '${fellowship}'
          ${hasProjects ? SELECT_PROJECTS : ""}
              UNION ALL
                 SELECT     u.id         id,
                            'user'       news_type,
                            u.NAME       title,
                            u.bio        description,
                            u.avatar_url img_url,
                            u.fellowship fellowship,
                            u.created_ts created
                   FROM     users u
    ${shouldFilterUsers ? composeUserFilter(fellowship) : ""}
               ORDER BY     created;
  `;
}

const composeUserFilter = (
  fellowship: Exclude<FellowshipUnion, "all">
): `WHERE fellowship in (${string})` => {
  const composeSQLArray = (arr: string[]) =>
    arr.map((string) => "'" + string + "'").join(",");
  return `WHERE fellowship in (${composeSQLArray(
    FILTER_USERS_MAP[fellowship]
  )})`;
};

const WITH_PROJECT_TABLE = `
    WITH p
        AS (SELECT  p.*,
                    u.fellowship
                    FROM   user_projects up
                    JOIN   projects p
                    ON     up.project_id = p.id
                    JOIN   users u
                    ON     up.user_id = u.id
            )` as const;

const SELECT_PROJECTS = `
    UNION ALL
       SELECT   p.id          id,
                'project'     news_type,
                p.NAME        title,
                p.description description,
                p.icon_url    img_url,
                p.fellowship  fellowship,
                p.created_ts  created
        FROM    p` as const;

const FILTER_USERS_MAP: Record<
  Exclude<FellowshipUnion, "all">,
  FellowshipUnion[]
> = {
  // Writers want to connect only to other writers and are not interested in founders' projects.
  writers: [FELLOWSHIP_ENUM.writers],
  // Angels want to connect to founders and other angels.
  angels: [FELLOWSHIP_ENUM.founders, FELLOWSHIP_ENUM.angels],
  // Founders want to connect to angels and other founders.
  founders: [FELLOWSHIP_ENUM.angels, FELLOWSHIP_ENUM.founders],
};
