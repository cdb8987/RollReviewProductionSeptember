import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
//
export default function Piechart (props){
    
    
    const {chartData, title, dataToCount } = props
    const screenWidth = Dimensions.get("window").width;
    const [data, setData] = useState([])
    // const colorArray = ["rgba(131, 167, 234, 1)", "yellow", "red", "green", "rgba(131, 167, 234, 1)", "yellow", "red", "green", "rgba(131, 167, 234, 1)", "yellow", "red", "green", "rgba(131, 167, 234, 1)", "yellow", "red", "green", "rgba(131, 167, 234, 1)", "yellow", "red", "green"]

    const colorArray = ["rgb(0, 204, 255)", "rgb(255, 255, 153)", "rgb(153, 255, 102)", "rgb(204, 153, 0)", "rgb(102, 102, 51)", "rgb(153, 51, 153)", "rgb(204, 0, 0)", "rgb(255, 153, 0)", "rgb(0, 51, 0)", "rgb(255, 153, 255)"]
   

    
    

    useEffect(()=>{
      let finalArray = []
      async function updateChartData(){

        let updatedData;

        try{
          updatedData = await chartData(dataToCount)
        
        
        


       
        for(let i=0; i<updatedData.length; i++){
          const objToPush = {
            name: updatedData[i][0],
            population: updatedData[i][1],
            color: colorArray[i],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          }
          finalArray.push(objToPush)
          
          
        }
        //Filters out the zero values from the array =>    
        finalArray = finalArray.filter(x => x.population > 0)
        finalArray = finalArray.sort(function(a, b) {
          var keyA = a.population,
            keyB =   b.population;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        
        finalArray = finalArray.reverse()
       
        if(finalArray.length > 10){finalArray = finalArray.slice(0, 10)}
        
        setData(finalArray)

        }
        catch(error){console.log(error, 'Location line 65')}

    }


      updateChartData()
      
      
      


    }, [])

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    const startingData = [
      {
        name: "Mount",
        population: 25,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "",
        population: 0,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "",
        population: 0,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "",
        population: 0,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];

  
    

    return (
        <>
       <View style={styles.chartContainer}>
        <Text style={styles.feedText}>{title}</Text>
        <PieChart style={{alignItems: 'center', justifyContent: 'center'}}
            data={data}
            width={screenWidth}
            height={220}
            
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[0,0]}
            absolute
        />
        </View>
        
        
        </>
    )
    
    

  }

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    // backgroundColor: '#19c37d',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  }, 
  feedText:{
    fontSize:24, 
    fontWeight: 'bold' 
    

  }
}
)