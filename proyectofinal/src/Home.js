import "./Home.css";
import React, { Component } from "react";
import axios from "axios";
import ChatWeb from "./chat"



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          playerName: null,
          Year: "",
          Year2:"",
          playerStats: {},
        };
      }
      nextPath(path) {
        this.props.history.push(path);
      }
    
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.getPlayerId();
        this.getYear();
        //this.getYear2();
        console.log(this.state.playerName);
      };
    
      handleChange = (event) => {
        const replace = event.target.value.split(" ").join("_");
        if (replace.length > 0) {
          this.setState({ playerName: replace });
        } else {
          alert("Introduce un nombre");
        }
      };
      
      getYear = (Year) => {
        this.state.year = Year;
      };
       
      
      
   
      getPlayerId = () => {
        axios
          .get(
            `https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`
          )
          .then(async (res) => {
            // console.log(res.data.data)
            if (res.data.data[0] === undefined) {
              alert("Este jugador no esta disponible");
            } else if (res.data.data.length > 1) {
              alert("Introduce el nombre completo");
            } else {
              await this.getPlayerStats(res.data.data[0].id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      getPlayerStats = (playerId) => {
        axios
          .get(
            `https://www.balldontlie.io/api/v1/season_averages?season=${this.state.Year}&player_ids[]=${playerId}`
          )
          .then(async (res) => {
            console.log(res.data.data);
            this.setState({ playerStats: res.data.data[0] });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    /*
      getPlayerStats2 = (playerId) => {
        axios
          .get(
            `https://www.balldontlie.io/api/v1/season_averages?season=${this.state.Year2}&player_ids[]=${playerId}`
          )
          .then(async (res) => {
            console.log(res.data.data);
            this.setState({ playerStats2: res.data.data[0] });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    */
    
      render() {
        return (
          
          <div className="App" class="Home">
            <div class="row mt-2 ml-5">
              <form class="form-inline mt-2" onSubmit={this.handleSubmit}>
                <div class="form-group mr-5">
                  <label for="exampleFormControlInput1" id="texto">
                    Nombre Jugador
                  </label>
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    
                  />
                </div>
    
                <div class="form-group mr-5">
                  <label for="exampleFormControlInput1" id="texto">
                    A??o
                  </label>
    
                  <input
                    value={this.state.Year}
                    onChange={(e) => {
                      this.setState({ Year: e.target.value });
                    }}
                    type="text"
                    id="anio"
                    placeholder="a??os inferiores a 2021"
                  />
                  
                </div>
    
            
    
                <input type="submit" value="Buscar" />
    
    {/*
                <div class="form-group mr-5 ml-5">
                  <label for="exampleFormControlInput1" id="texto">
                    A??o
                  </label>
    
                  <input
                    value={this.state.Year2}
                    onChange={(e) => {
                      this.setState({ Year2: e.target.value });
                    }}
                    type="text"
                    id="anio"
                    placeholder="numeros inferiores a 2021"
                  />
                </div>
    
                <input type="submit" value="Comparar"/>
    */ }

              </form>
            </div>

            <article class="grid">
            <div class="container">
            <div class="row align-items-center mt-4">

              <h2>Promedio Temporada: {this.state.Year}</h2>
              <table class="table table-bordered table-dark">
                <thead>
                  <tr>
                    <th>Estadisticas</th>
                    <th>{this.state.playerName}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Partidos Jugados:</td>
                    <td>{this.state.playerStats["games_played"]}</td>
                  </tr>
                  <tr>
                    <td>Puntos promediados:</td>
                    <td>{this.state.playerStats["pts"]}</td>
                  </tr>
                  <tr>
                    <td>Rebotes promediados:</td>
                    <td>{this.state.playerStats["reb"]}</td>
                  </tr>
                  <tr>
                    <td>Asistencias promediados:</td>
                    <td>{this.state.playerStats["ast"]}</td>
                  </tr>
                  <tr>
                    <td>Tapones promediados:</td>
                    <td>{this.state.playerStats["blk"]}</td>
                  </tr>
                  <tr>
                    <td>Robos promediados:</td>
                    <td>{this.state.playerStats["stl"]}</td>
                  </tr>
                  <tr>
                    <td>P??rdidas promediadas:</td>
                    <td>{this.state.playerStats["turnover"]}</td>
                  </tr>
                  
                </tbody>
              </table>
              </div>
            </div>
    
    
          {/*  <div class="nav justify-content-end mr-5">
              <button class="btn btn-danger" onClick={() => Home.auth().signOut()}>Chat Comunitario</button>
            </div> 
                        <h3 class="mr-5">Entra e Inicia sesion con Google para acceder al chat</h3>

            */}
            <div class=" row align-items-center" id="entrarChat">
            <button
              type="submit"
              class="btn btn-primary mr-5"
              onClick={() => this.nextPath('/chat')}
            >CHAT</button>
            </div>
          </article>
          </div>
        );
      }
    }
export default Home;