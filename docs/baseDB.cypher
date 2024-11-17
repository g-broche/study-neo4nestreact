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