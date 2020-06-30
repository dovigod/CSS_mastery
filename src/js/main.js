import { random} from "./utility";



const body = document.querySelector("body");
const header = document.querySelector(".header_flex_box");
const head = document.querySelector("header");

const scrollTriger =() =>{
  let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
  if(scrollLocation>= 40)
  {
      header.classList.add("scroll_down");
      head.classList.add("header_down");
  }
  else{
      header.classList.remove("scroll_down");
      head.classList.remove("header_down");

  }
}
const init = () => {
    window.addEventListener('scroll', scrollTriger);
}

init();