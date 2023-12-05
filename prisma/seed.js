const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main(){
    const news = [
        {title: 'Hello world', description: 'Short description here max of 200 characters', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {title: 'Davao City suspends classes, pushes WFH after magnitude 7.4 quake!', description: 'Davao City has announced the suspension of classes at all levels and the adoption of WFH arrangements in government offices on Monday, following the magnitude 7.4 earthquake last Saturday.', body: 'The Davao City government has announced the suspension of classes at all levels and the adoption of work-from-home (WFH) arrangements in government offices on Monday, following the magnitude 7.4 earthquake over the weekend.\nIn a statement released Sunday, Davao City Acting Mayor Melchor Quitain Jr. ordered the suspension of classes at all levels in all public educational institutions, while encouraging private schools to do the same.\nHe also ordered the adoption of work-from-home arrangements in all national and local government offices in the city, including government-owned and -controlled corporations, excluding offices performing safety and security, health, social services, and disaster and emergency response services.\nQuitain also encouraged private offices and establishments to adopt WFH arrangements for the safety and convenience of their employees.\nA magnitude 7.4 earthquake, initially measured at magnitude 6.9, struck off Hinatuan, Surigao del Sur at 10:37 p.m. on Saturday..\nA pregnant woman died after a wall of a collapsed house fell over her. She was rushed to a hospital but was declared dead on arrival.\nState seismologists soon after issued a tsunami warning, cautioning owners of boats in harbors or shallow coastal waters to secure their vessels and move away from the waterfront.\nA magnitude 6.0 aftershock with a 10-kilometer depth of focus hit the same area at 6:36 p.m. on Sunday, December 3, 2023.—RF, GMA Integrated News', imageURL: 'images/2023-12-02T174718Z_781871991_RC25P4A04JQI_RTRMADP_3_PHILIPPINES-QUAKE_2023_12_03_04_03_05.jpg'},
    ]

    for(let article of news){
        const articlePublished = await prisma.article.create({data: article})
        console.log(articlePublished)
    }

}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });