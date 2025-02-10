import {Actor} from "../../../Actor/Actor";
import {Capitulo, Data} from "../Data/data";
import {HomePage} from "../Page/HomePage";

export const getAnimeByDayTask = () => async (actor: Actor, page: HomePage, data: Data) => {
    await actor.attemptsTo(
        async () => {
            const listOfAnimeByDay = await page.getListOfAnimeByDay();
            for (const animeOfDay of listOfAnimeByDay) {
                const title = await page.getTitleOfAnime(animeOfDay);
                const link = await page.getLinkToAnime(animeOfDay) ?? "";
                const image = await page.getImageOfAnime(animeOfDay);
                if (data.validateNameOfAnimeToSendDiscord(title)) {
                    let cap = new Capitulo(data.getPage + link, title, data.getPage + image);
                    await data.addCap(cap);
                }
            }
        }
    );
};