import type { Translation } from "../translation";
import da from "./da";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import nl from "./nl";
import pt from "./pt";
import sv from "./sv";
import ja from "./ja";
import zh from "./zh";
import ko from "./ko";
import pl from "./pl";
import tr from "./tr";
import ru from "./ru";
import nb from "./nb";

/** All non-English translations, keyed by locale code. English comes straight
 *  from the base config, so it is deliberately absent here. */
export const TRANSLATIONS: Record<string, Translation> = {
  da, de, fr, es, it, nl, pt, sv, ja, zh, ko, pl, tr, ru, nb,
};
