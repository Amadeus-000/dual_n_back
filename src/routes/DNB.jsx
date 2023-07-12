import MenuAppBar from '../components/MenuAppBar';
import { Grid, Container } from '@mui/material';
import Box from '@mui/material/Box';
import shadows from '@mui/material/styles/shadows';
import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { GameFunction } from '../composables/GameFunc.js';
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

function DNB() {
    const shadow={
        boxShadow:"4px 4px 5px 5px rgb(190,199,212)"
    }
    const white={
        backgroundColor:"white"
    }

    const SquarePaper = ({ children,color }) => (
        <div style={{ position: 'relative', width: '100%' }}>
          <div style={{ paddingTop: '100%' }} />
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {children}
          </div>
        </div>
    );

    const { GenRandomPositions,GenRandomColors }=GameFunction();

    const pressedButton1 = () => {
        btn1Input.current=true;
    };
    const pressedButton2 = () => {
        btn2Input.current=true;

    };

    const changeColor = (color,cellNum) => {
        console.log("changeColor");
        if(cellNum==1){
            setCell1Color(color);
        }else if(cellNum==2){
            setCell2Color(color);
        }else if(cellNum==3){
            setCell3Color(color);
        }else if(cellNum==4){
            setCell4Color(color);
        }else if(cellNum==5){
            setCell5Color(color);
        }else if(cellNum==6){
            setCell6Color(color);
        }else if(cellNum==7){
            setCell7Color(color);
        }else if(cellNum==8){
            setCell8Color(color);
        }else if(cellNum==9){
            setCell9Color(color);
        }
    };

    const changeBoardColor = (ans) => {
        if(ans==-1){
            setBoardColor("white");
            return;
        }
        setBoardColor(ans?"palegreen":"pink");
    };

    const sendResult=(result,gametype,gameiteration,gamenback)=>{
        let result_str="";
        for (let i = 0; i < result.length; i++) {
            if(result[i]){
                result_str+="1";
            }else{
                result_str+="0";
            }
        }

        const url="https://us-central1-test1-7f2c4.cloudfunctions.net/addDNBResult?result="+ result_str+"&gametype="+gametype+"&gameiteration="+String(gameiteration)+"&gamenback="+String(gamenback);
        axios.get(url);
    };

    const handleIterationChange = (event) => {
        setIteration(Number(event.target.value));
    };
    const handleNbackChange = (event) => {
        setNback(Number(event.target.value));
    };
    const handleIntervalChange = (event) => {
        setGameInterval(Number(event.target.value));
    };

    const btn1Input=useRef(false);
    const btn2Input=useRef(false);
    const [cell1Color, setCell1Color] = useState("#a0d8ef");
    const [cell2Color, setCell2Color] = useState("#a0d8ef");
    const [cell3Color, setCell3Color] = useState("#a0d8ef");
    const [cell4Color, setCell4Color] = useState("#a0d8ef");
    const [cell5Color, setCell5Color] = useState("#a0d8ef");
    const [cell6Color, setCell6Color] = useState("#a0d8ef");
    const [cell7Color, setCell7Color] = useState("#a0d8ef");
    const [cell8Color, setCell8Color] = useState("#a0d8ef");
    const [cell9Color, setCell9Color] = useState("#a0d8ef");
    const [boardColor, setBoardColor] = useState("white");
    const [gameType, setGameType] = useState("COLOR");
    const [iteration, setIteration] = useState(20);
    const [nback, setNback] = useState(2);
    const [interval, setGameInterval] = useState(3);

    const StartGame=()=>{
        let frame=0;
        let count=0;
        const answers=[];
        const positions=GenRandomPositions(iteration+nback);
        const colors=GenRandomColors(iteration+nback);

        console.log(positions);
        console.log(colors);

        const nowPlaying=setInterval(()=>{
            console.log("frame : "+frame);
            if(count==iteration+nback){
                clearInterval(nowPlaying);
                changeBoardColor(-1);
                console.log("GAME FINISH");
                console.log(answers);
                count=0;
                sendResult(answers,"COLOR",iteration,nback)
                return;
            }
            // セルに色を表示
            if(frame%(interval+1)==0){
                console.log('playing now...');
                btn1Input.current=false;
                btn2Input.current=false;
                changeBoardColor(-1);
                changeColor(colors[count],positions[count]);
            // セルの色を戻す
            }else if(frame%(interval+1)==interval){
              changeColor("#a0d8ef",positions[count]);
              if(count>=nback){
                let correct_ans1=(colors[count]==colors[count-nback])?true:false;
                let correct_ans2=(positions[count]==positions[count-nback])?true:false;
                changeBoardColor( (btn1Input.current==correct_ans1)&&(btn2Input.current==correct_ans2) );
                if (btn1Input.current == correct_ans1 && btn2Input.current == correct_ans2) {
                    answers.push(true); // someValueは配列に追加する要素
                }else{
                    answers.push(false);
                }
                console.log("answers : "+answers)
                console.log("btn1Input : "+btn1Input.current);
                console.log("btn2Input : "+btn2Input.current);
                console.log("correct_ans1 : "+correct_ans1);
                console.log("correct_ans2 : "+correct_ans2);
              }
              count++;
            }
            frame++;
          },1000);
    };

    return (
    <div className="App">
        <MenuAppBar />
        <Container maxWidth="lg" style={{ marginTop: "2rem",marginBottom:"3rem",paddingTop:"1rem",paddingBottom:"1rem",...shadow,transform: 'scale(0.9)',backgroundColor:boardColor}}>
            <Grid container>
                <Grid item xs={2} style={{backgroundColor:"#f5f5f5",marginRight:"0.5rem",marginLeft:"-0.5rem"}}>
                    <h4>Windows Dual N Back</h4>
                    <Button variant="contained" color="primary" style={{ color: 'white',width:"75%"}} onClick={StartGame}>
                        Start
                    </Button>
                    <TextField
                        type="number"
                        label="Iteration"
                        defaultValue="20"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:"75%",marginTop:"2rem"}}
                        onChange={handleIterationChange}
                    />
                    <TextField
                        type="number"
                        label="Nback"
                        defaultValue="2"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:"75%",marginTop:"2rem"}}
                        onChange={handleNbackChange}
                    />
                    <TextField
                        type="number"
                        label="Interval"
                        defaultValue="2"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:"75%",marginTop:"2rem"}}
                        onChange={handleIntervalChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <SquarePaper color={cell1Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell2Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell3Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell4Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell5Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell6Color}> 
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell7Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>
                        <Grid item xs={4}>
                            <SquarePaper color={cell8Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid><Grid item xs={4}>
                            <SquarePaper color={cell9Color}>
                                <Paper style={{ height: '100px'}} />
                            </SquarePaper>
                        </Grid>    
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{backgroundColor:"#f5f5f5",marginRight:"-0.5rem",marginLeft:"0.5rem"}}>
                    <h4>Score</h4>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center" style={{marginTop: "1rem",paddingBottom:"1rem",backgroundColor:"#f5f5f5"}}>
                <Grid item>
                    <Button variant="contained" color="secondary" style={{ color: 'white' }} onClick={pressedButton1}>
                        Color
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" style={{ color: 'white' }} onClick={pressedButton2}>
                        Position
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </div>
    );
}

export default DNB;