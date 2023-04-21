import { Effect } from "./Effects"

type Card = {
    name: String;
    wager: number;
    rules_text: String;
    alignments?: String;
    type?: String;
    image?: String;
    effect?: Effect 
}

export default Card