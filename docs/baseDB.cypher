// done as a first step block of instructions : adding most basic nodes (excluding video) and game to genre relation 

CREATE
(card:GENRE{label:"card"}),
(drawingGenre:GENRE{label:"drawing"}),
(fighting:GENRE{label:"fighting"}),
(gachaGenre:GENRE{label:"gacha"}),
(horrorGenre:GENRE{label:"horror"}),
(mobile:GENRE{label:"mobile"}),
(openworld:GENRE{label:"open world"}),
(rpg:GENRE{label:"RPG"}),
(storyGenre:GENRE{label:"story driven"}),
(platformer:GENRE{label:"platformer"}),
(funnyGenre:GENRE{label:"funny"}),
(multiplayer:GENRE{label:"multiplayer"}),

(bluearchive:GAME{name:"Blue Archive"}),
(dbzkakarot:GAME{name:"Dragon Ball Z: Kakarot"}),
(garticphone:GAME{name:"Gartic Phone"}),
(nikke:GAME{name:"NIKKE"}),
(stray:GAME{name:"Stray"}),
(supermariowonder:GAME{name:"Super Mario Wonder"}),
(pokemonpocket:GAME{name:"Pokemon Trading Card Game Pocket"}),
(aquadance:GAME{name:"The aquarium does not dance"}),

(videoType:TYPE{label:"video"}),
(shortType:TYPE{label:"short"}),
(archiveType:TYPE{label:"archive"}),

(gameCategory:CATEGORY{label:"game"}),
(chattingCategory:CATEGORY{label:"chatting"}),
(drawingCategory:CATEGORY{label:"drawing"}),
(singingCategory:CATEGORY{label:"singing"}),

(chattingTag:TAG{label:"chatting"}),
(gachaTag:TAG{label:"gacha"}),
(gameTag:TAG{label:"game"}),
(horrorTag:TAG{label:"horror"}),
(Karaoke:TAG{label:"karaoke"}),
(cover:TAG{label:"cover"}),
(shortTag:TAG{label:"shorts"}),
(vertical:TAG{label:"vertical_stream"}),
(participatory:TAG{label:"viewer_participation"}),

(youtube:PLATFORM{name:"Youtube"}),

(bluearchive)-[:HAS]->(gachaGenre),
(bluearchive)-[:HAS]->(storyGenre),
(bluearchive)-[:HAS]->(funnyGenre),
(bluearchive)-[:HAS]->(mobile),
(dbzkakarot)-[:HAS]->(fighting),
(dbzkakarot)-[:HAS]->(openworld),
(dbzkakarot)-[:HAS]->(rpg),
(dbzkakarot)-[:HAS]->(storyGenre),
(garticphone)-[:HAS]->(drawingGenre),
(garticphone)-[:HAS]->(multiplayer),
(garticphone)-[:HAS]->(funnyGenre),
(nikke)-[:HAS]->(gachaGenre),
(nikke)-[:HAS]->(storyGenre),
(stray)-[:HAS]->(storyGenre),
(stray)-[:HAS]->(openworld),
(supermariowonder)-[:HAS]->(platformer),
(pokemonpocket)-[:HAS]->(gachaGenre),
(pokemonpocket)-[:HAS]->(card),
(pokemonpocket)-[:HAS]->(mobile),
(pokemonpocket)-[:HAS]->(multiplayer),
(aquadance)-[:HAS]->(horrorGenre),
(aquadance)-[:HAS]->(storyGenre)


// done as a second step block of instructions : adding a video and its relations

CREATE
(newvid:VIDEO{title:"[Dragon Ball Z: Kakarot] First time playing! Time for the Cell games!!! #07", description:"It's time for the Cell games with some iconic moments of Dragon Ball Z!"})

WITH newvid
MATCH (p:PLATFORM)
WHERE p.name = "Youtube"
MERGE (newvid)-[:IS_HOSTED_ON{
    date: date('2024-11-05'),
    url:"https://www.youtube.com/watch?v=wRsDpb6o_mg",
    thumbnail:"2024-11-05-small.webp"}
    ]->(p)

WITH newvid
UNWIND ['game'] AS tagLabel
MATCH (tag:TAG {label: tagLabel})
MERGE (newvid)-[:HAS]->(tag)

WITH newvid
MATCH (ca:CATEGORY)
WHERE ca.label = "game"
MERGE (newvid)-[:BELONGS_TO]->(ca)

WITH newvid
MATCH (ty:TYPE)
WHERE ty.label = "archive"
MERGE (newvid)-[:IS_OF]->(ty)

WITH newvid
MATCH (ga:GAME)
WHERE ga.name = "Dragon Ball Z: Kakarot"
MERGE (newvid)-[:FEATURES]->(ga)


// adding extra nodes and relation for testing parsing record

CREATE
(storyTag:TAG{label:"story"})
WITH storyTag
MATCH (v:VIDEO)
WHERE v.title = "[Dragon Ball Z: Kakarot] First time playing! Time for the Cell games!!! #07"
MERGE (v)-[:HAS]->(storyTag)

// removing video before creating it again with added id

MATCH (v:VIDEO {title: "[Dragon Ball Z: Kakarot] First time playing! Time for the Cell games!!! #07"})
DETACH DELETE v;

// adding a index node to hold data for node index property if there is not an existing property being a unique identifier

Create (ic:INDEX_COUNTER{video:0})

// recreate sample video using the index and incrementing it

MATCH (ic:INDEX_COUNTER)
SET ic.video = ic.video + 1
WITH ic.video as newId
CREATE
(remadevideo:VIDEO{
    id:newId,
    title:"[Dragon Ball Z: Kakarot] First time playing! Time for the Cell games!!! #07",
    description:"It's time for the Cell games with some iconic moments of Dragon Ball Z!"
    })

WITH remadevideo
MATCH (p:PLATFORM)
WHERE p.name = "Youtube"
MERGE (remadevideo)-[:IS_HOSTED_ON{
    date: date('2024-11-05'),
    url:"https://www.youtube.com/watch?v=wRsDpb6o_mg",
    thumbnail:"2024-11-05-small.webp"}
    ]->(p)

WITH remadevideo
UNWIND ['game', 'story'] AS tagLabels
MATCH (tags:TAG {label: tagLabels})
MERGE (remadevideo)-[:HAS]->(tags)

WITH remadevideo
MATCH (ca:CATEGORY)
WHERE ca.label = "game"
MERGE (remadevideo)-[:BELONGS_TO]->(ca)

WITH remadevideo
MATCH (ty:TYPE)
WHERE ty.label = "archive"
MERGE (remadevideo)-[:IS_OF]->(ty)

WITH remadevideo
MATCH (ga:GAME)
WHERE ga.name = "Dragon Ball Z: Kakarot"
MERGE (remadevideo)-[:FEATURES]->(ga)

// creating constraints

CREATE CONSTRAINT unique_genre IF NOT EXISTS
FOR (ge:GENRE) REQUIRE ge.label IS UNIQUE;

CREATE CONSTRAINT unique_game IF NOT EXISTS
FOR (ga:GAME) REQUIRE ga.name IS UNIQUE;

CREATE CONSTRAINT unique_type IF NOT EXISTS
FOR (ty:TYPE) REQUIRE ty.label IS UNIQUE;

CREATE CONSTRAINT unique_category IF NOT EXISTS
FOR (ca:CATEGORY) REQUIRE ca.label IS UNIQUE;

CREATE CONSTRAINT unique_tag IF NOT EXISTS
FOR (tag:TAG) REQUIRE tag.label IS UNIQUE;

CREATE CONSTRAINT unique_platform IF NOT EXISTS
FOR (pl:PLATFORM) REQUIRE pl.name IS UNIQUE;

CREATE CONSTRAINT video_key IF NOT EXISTS
FOR (vi:VIDEO) REQUIRE (vi.id, vi.title, vi.description) IS NODE KEY;

// adding permissions and roles

CREATE CONSTRAINT unique_role IF NOT EXISTS
FOR (role:ROLE) REQUIRE role.label IS UNIQUE;

CREATE CONSTRAINT unique_permission IF NOT EXISTS
FOR (perm:PERMISSION) REQUIRE perm.right IS UNIQUE;

CREATE
(permReadMedia:PERMISSION{right:"read:media_data"}),
(permCreateMedia:PERMISSION{right:"create:media_data"}),
(permEditMedia:PERMISSION{right:"edit:media_data"}),
(permDeleteMedia:PERMISSION{right:"delete:media_data"}),

(permReadSelfUser:PERMISSION{right:"read:self_user"}),
(permEditSelfUser:PERMISSION{right:"edit:self_user"}),
(permReadUserIndex:PERMISSION{right:"read:user_index"}),
(permEditUserRole:PERMISSION{right:"edit:user_role"}),

(admin:ROLE{label:"admin"}),
(user:ROLE{label:"user"})

WITH 
    permReadMedia, 
    permCreateMedia, 
    permEditMedia, 
    permDeleteMedia, 
    permReadSelfUser, 
    permEditSelfUser, 
    permReadUserIndex, 
    permEditUserRole,
    admin,
    user
UNWIND [
    permReadMedia,
    permCreateMedia,
    permEditMedia,
    permDeleteMedia,
    permReadSelfUser,
    permEditSelfUser,
    permReadUserIndex,
    permEditUserRole
    ] AS admin_permissions
MERGE (admin)-[:HAS]->(admin_permissions)

WITH 
    permReadMedia,  
    permReadSelfUser, 
    permEditSelfUser, 
    user
UNWIND [
    permReadMedia,
    permReadSelfUser,
    permEditSelfUser
    ] AS user_permissions
MERGE (user)-[:HAS]->(user_permissions)