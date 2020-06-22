import { random} from "./utility";

const one = random(10);

const two = random(29);



const init = () => {
    console.log(`${one} ${two}`);
}
setInterval(init,2000);