

export const GameFunction = () => {
  const getRandomNumber=(previous_num=-1,range=9,probability=45)=>{
    // probabilityとは前回と同じ値がでる確率です。
    if(previous_num==-1){
      return Math.floor(Math.random()*range); 
    }
    if(Math.floor(Math.random()*100)<probability){
      console.log("enter")
      return previous_num;
    }else{
      let num=Math.floor(Math.random()*range);
      while(num==previous_num){
        num=Math.floor(Math.random()*range);
      }
      return num+1;
    }
  };
  const GenRandomPositions=(iter)=>{
    const positions=[];
    let previous_num=-1;
    for(let i=0;i<iter;i++){
      positions.push(getRandomNumber(previous_num));
      previous_num=positions[i];
    }
    return positions;
  };

  const GenRandomColors=(iter)=>{
    const colors_list=["green","red","blue","yellow","purple","gray","darkturquoise","lightgreen","mediumvioletred"];
    const colors=[];
    let previous_num=-1;
    for(let i=0;i<iter;i++){
      colors.push( colors_list[getRandomNumber(previous_num)] );
      previous_num=colors_list.indexOf(colors[i]);
    }
    return colors;
  };


  return {GenRandomPositions,GenRandomColors};
};
