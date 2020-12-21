import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { userInfo } from "os";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: "",
      animeData : [],
      animeData2 : [],
      animeName :[],
      malId:[],
      anilist_id:[],
      filename:[],
      tokenthumb:[],
      at:[],
      thumbnailData:[],
      videoData:[],
      isLoading: false,
      class: "",
      info:"",
      name:"",
      link : "",
      click : "",
       
    };
  }

  componentDidMount() {
    dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
      evt.preventDefault();
    };
    
    dropContainer.ondrop = function(evt) {
     
      fileInput.files = evt.dataTransfer.files;
    
    
      const dT = new DataTransfer();
      dT.items.add(evt.dataTransfer.files[0]);
      
      fileInput.files = dT.files;
    
      evt.preventDefault();
        
    };
    window.addEventListener("dragover",function(e){
      e = e || event;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || event;
      e.preventDefault();
    },false);
  }


  handleLink(e) {
    this.setState({
      imageLink: e.target.value,
      isLoading: true,
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleAnime();
      
      this.setState({
        isLoading: true,
      });
    }   
    
  }
    

  handleAnime() {
    axios
      .get("/anime/getAnime", {
        params: {
          imageLink: this.state.imageLink
        }
      })
      .then(res => {
        console.log(res); 
        this.setState({
          animeData: res.data.docs,
          isLoading: true
        });
        this.handleAnimeData();
        this.handleThumbnail();
        this.handleVideo();
      });
  }
  handleThumbnail() {
    axios
      .get("/anime/getThumbnail", {
        params: {
        anilist_id:this.state.anilist_id,
        filename:this.state.filename,
        tokenthumb:this.state.tokenthumb,
        at:this.state.at,
          
        }
      })
      .then(res => {
        console.log(res, "working?"); 
        this.setState({
          thumbnailData: res.data
        })
        
        });
  }

  handleVideo() {
    axios
      .get("/anime/getVideo", {
        params: {
        anilist_id:this.state.anilist_id,
        filename:this.state.filename,
        tokenthumb:this.state.tokenthumb,
        at:this.state.at,
          
        }
      })
      .then(res => {
        console.log(res, "working??"); 
        this.setState({
          videoData: res.data
        })
        


        
        });
      
      
  }
  handleImage(file){
  
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file); 
    } else {
      preview.src = "";  
    }
  }
 
  handleImageUpload(){
    var img = document.querySelector("img"); 
    var canvas = document.createElement("canvas");

  var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

fetch("https://trace.moe/api/search", {
  method: "POST",
  body: JSON.stringify({ image: canvas.toDataURL("image/jpeg", 0.8) }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    
    this.setState({
      animeData2: result.docs
  });
  this.handleAnime();
  this.handleAnimeData();
  this.handleAnimeData2();
  this.handleThumbnail();
  this.handleVideo();



  });
  }

  handleAnimeData(){

  
    let animeName = this.state.animeData.slice(0, 1).map(x => x.title_english);
    this.setState({
      animeName: animeName,
      name: "Anime:",
      info: "For more info about this anime :"
    });
    let malId = this.state.animeData.slice(0, 1).map(x => x.mal_id);
    this.setState({
      malId: malId,
      link : "https://myanimelist.net/anime/",
     
      
    });
    let tokenthumb = this.state.animeData.slice(0, 1).map(x => x.tokenthumb);
    this.setState({
      tokenthumb: tokenthumb,
      
    });
    let filename = this.state.animeData.slice(0, 1).map(x => x.filename);
    this.setState({
      filename: filename,
      
    });
    let at = this.state.animeData.slice(0, 1).map(x => x.at);
    this.setState({
      at: at,
      
    });
    let anilist_id = this.state.animeData.slice(0, 1).map(x => x.anilist_id);
    this.setState({
      anilist_id: anilist_id,
     
      
    });

    
  }
  handleAnimeData2(){

  
    let animeName = this.state.animeData2.slice(0, 1).map(x => x.title_english);
    this.setState({
      animeName: animeName,
      name: "Anime:",
      info: "For more info about this anime :"
    });
    let malId = this.state.animeData2.slice(0, 1).map(x => x.mal_id);
    this.setState({
      malId: malId,
      link: "https://myanimelist.net/anime/",
      click: "click here"
     
    });
    let tokenthumb = this.state.animeData2.slice(0, 1).map(x => x.tokenthumb);
    this.setState({
      tokenthumb: tokenthumb,
      
    });
    let filename = this.state.animeData2.slice(0, 1).map(x => x.filename);
    this.setState({
      filename: filename,
      
    });
    let at = this.state.animeData2.slice(0, 1).map(x => x.at);
    this.setState({
      at: at,
      
    });
    let anilist_id = this.state.animeData2.slice(0, 1).map(x => x.anilist_id);
    this.setState({
      anilist_id: anilist_id,
      
    });

    
  }
 


  
  




  render() {
   
      

    
   
    return (
      <div>
  <div>
 
      </div>
      <div>
      <div>
              <div>
                <input
                className = "linkInput"
                  onKeyDown={this.handleKeyDown.bind(this)}
                  onChange={this.handleLink.bind(this)}
                  placeholder="Image Link"
                ></input>
                
               
              </div>
              <div id="dropContainer" type="file" onClick={this.handleImage.bind(this)}>
   
</div>
              <div>
              <input className="imageInput" id="fileInput" type="file" onChange={this.handleImage.bind(this)}></input>
              <button className="previewButton" onClick={this.handleImage.bind(this)}>Preview Dropped Image</button>
              <p className="info"> / Drag & Drop Anime ScreenShot / Ctrl+V / Enter Image URL</p>
              <img  className="preview" src="" height="200" alt=""></img>
              </div>
            </div>
            <button className="submitButton"  onClick={this.handleLink.bind(this)}
                  onClick={this.handleImageUpload.bind(this)} >Search!</button>

      </div>
      <img className="preview" src={this.state.imageLink}></img>
      
      
      <div className="animeTitle">
                {this.state.name} {this.state.animeName}
                </div>
                
                <div className="animeLink">    
                {this.state.info} <a href={this.state.link + this.state.malId}>click here</a>           
                </div>
                
               <div>

      </div>
              

            
      </div>
    );
  }
  



}

module.exports = Home;
