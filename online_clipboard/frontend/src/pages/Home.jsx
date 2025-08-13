import InputBox from "./components/inputBox";
// import axios from 'axios';

// const API_URL = "/api/clips/";


export function Home() {

    // async function getclip(key) {
    //     const response = await axios.get(API_URL + '829978'  );
    //     console.log(response.data.clip.content);
    //     return response.data;

    // }
    // async function sendclip(){
    //     const content = document.querySelector('input[type="text"]').value;
    //     const response = await axios.post(API_URL + 'create', { content });
    //     return response.data;
    // }



  return (
  <div >
    <div>
      <InputBox/>
    </div>
    
  </div>
);
}

export default Home