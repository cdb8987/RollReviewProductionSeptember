import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FFmpegKit,
    FFmpegKitConfig, FFprobeSession, Level, LogRedirectionStrategy, SessionState
} from "ffmpeg-kit-react-native";

/**
 * 
 * @param {String} inputVideoPathURI file path to the video to be trimmed from expo's file system.  
 * @param {Number} startTime start time of the video measured in seconds
 * @param {*} duration duration of the video measured in seconds
 * @param {*} outPutVideoPathURI 
 */

export function trimVideoWithFFmpeg(inputVideoPathURI, startTime, duration, outPutVideoPathURI){
    const startTimeString = formatDuration(startTime)
    const durationString = formatDuration(duration)
     
    const FFmpegCommandString = `-i ${inputVideoPathURI} -ss ${startTimeString} -t ${durationString} -c:v copy -c:a copy ${outPutVideoPathURI}` 
    
    //need to set up instance of FFmpeg Kit Config.  IS THIS ASYNC?
    FFmpegKitConfig.enableLogCallback(undefined);
    FFmpegKitConfig.enableStatisticsCallback(undefined);
    
    //Executes the FFmpeg operation
    runFFmpegProgramattically(FFmpegCommandString)
    
    function formatDuration(duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - (hours * 3600)) / 60);
    let seconds = duration - (hours * 3600) - (minutes * 60);

    // Pad with '0' if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}
    
    //alters the runFFmpeg command to accept command text from a function argument instead of user input/state   
    function runFFmpegProgramattically(commandText){
        let ffmpegCommand = commandText;

        console.log(`Current log level is ${Level.levelToString(FFmpegKitConfig.getLogLevel())}.`);

        console.log('Testing FFmpeg COMMAND asynchronously.');

        console.log(`FFmpeg process started with arguments: \'${ffmpegCommand}\'.`);

        FFmpegKit.execute(ffmpegCommand).then(async (session) => {
            const state = FFmpegKitConfig.sessionStateToString(await session.getState());
            const returnCode = await session.getReturnCode();
            const failStackTrace = await session.getFailStackTrace();
            const output = await session.getOutput();

            console.log(`FFmpeg process exited with state ${state} and rc ${returnCode}.${notNull(failStackTrace, "\\n")}`);

            this.appendOutput(output);

            if (state === SessionState.FAILED || !returnCode.isValueSuccess()) {
                console.log("Command failed. Please check output for the details.");
            }
        });
    };
    

}

export let startingPositions = ["Guard", "Side Control", "Mount", "Back Control"]
export let startingTechniques = ['Armbar', 'Kimura', 'Lapel Choke', 'Triangle Choke', 'Americana', 'Head and Arm Choke', 'Rear Naked Choke', 'Escape', 'Sweep']

export const loadPositionsAndTechniques = async function(positions, techniques, setPositions, setTechniques){
    if(await AsyncStorage.getItem('startingPositions')){
      startingPositions = await JSON.parse(await AsyncStorage.getItem('startingPositions'))
      if(String(startingPositions) !== String(positions)){
        setPositions(startingPositions)
      }
       
    }
    else{
      AsyncStorage.setItem('startingPositions', JSON.stringify(startingPositions) )
    }
    if(await AsyncStorage.getItem('startingTechniques')){
      startingTechniques = await JSON.parse(await AsyncStorage.getItem('startingTechniques'))
      if(String(startingTechniques) !==String(techniques)){setTechniques(startingTechniques)}
    }
    else{
      AsyncStorage.setItem('startingTechniques', JSON.stringify(startingTechniques) )
      
    }
  }

export const retrieveFilteredNotes = async function(positionSelection, techniqueSelection, updateNotesScreenState){
  let FilteredRollRecords, FilteredDrillRecords;
  try{FilteredRollRecords = await retrieveFilteredRollRecords(positionSelection, techniqueSelection)
   
}
  catch(error){console.log(error, 'functions.js line 35')}
  try{FilteredDrillRecords = await retrieveFilteredDrillRecords(positionSelection, techniqueSelection)
   
  }
  catch(error){console.log(error, 'functions.js line 39')}

  let aggregatedRecords;
  try{
  aggregatedRecords = [...FilteredRollRecords, ...FilteredDrillRecords]
  }
  catch(error){'Spread Operation aggregatedRecordsFailed' + error}



  aggregatedRecords.sort(function(a, b) {
    var keyA = new Date(a.createdAt),
      keyB = new Date(b.createdAt);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })
  
  aggregatedRecords.reverse()

  updateNotesScreenState(aggregatedRecords)
    
}

export const retrieveFilteredTutorials = async function(positionSelection, techniqueSelection, updateNotesScreenState){
  let FilteredTutorials;
  try{FilteredTutorials = await retrieveFilteredExternalVideoRecords(positionSelection, techniqueSelection)
   
}
  catch(error){console.log(error, 'functions.js line 69')}

  FilteredTutorials.sort(function(a, b) {
    var keyA = new Date(a.createdAt),
      keyB = new Date(b.createdAt);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })
  
  FilteredTutorials.reverse()

  updateNotesScreenState(FilteredTutorials)
    
}




export const getData = async (key)=>{
  if(await AsyncStorage.getItem(key)===null){
    const initialData = await JSON.stringify({ "data":[] })
    await AsyncStorage.setItem(key, initialData)
  }
  let storedData = await JSON.parse(await AsyncStorage.getItem(key))
  
  return storedData
}      



const updateLocalVideoRecordData = async (videoRecordType, videoStorageURI, thumbnailStorageURI, timestamp)=>{
  const storedData = await getData('LocalVideoHistory')
  //videoRecordType takes either "localVideoFull" or "localVideoClip"

  

  const localVideoHistory = storedData
  const d = new Date()
  let localVideoRecord={}
  localVideoRecord['createdAt'] = d
  localVideoRecord['recordType'] = videoRecordType
  localVideoRecord['recordID'] = d.getTime()
  localVideoRecord['uri'] = videoStorageURI
  localVideoRecord['thumbnailURI']= thumbnailStorageURI
  localVideoRecord['timestamp']= timestamp
  for(let i of ['position', 'technique', 'notes']){
    if(!localVideoRecord[i]){
      localVideoRecord[i]=''
    }
  }
  
    localVideoHistory.data.push(localVideoRecord)
    
    await AsyncStorage.setItem('LocalVideoHistory', JSON.stringify(localVideoHistory))
    
    
  // }
}

//REFACTOR the addLocalVideoFullRecord and addLocalVideoClipRecord functions no longer need to be broken out since all videos going forward can play full length clips or videos.  This can be consolidated.  
export const addLocalVideoFullRecord=(URI, thumbnailURI)=>{updateLocalVideoRecordData('localVideoFull', URI, thumbnailURI, 0)}

export const addLocalVideoClipRecord=(URI, thumbnailURI, timestamp, )=>{updateLocalVideoRecordData('localVideoClip', URI, thumbnailURI, timestamp)}

export const deleteLocalVideoRecord = async (recordID)=>{
  const storedData = await getData('LocalVideoHistory')
  const localVideoHistory = storedData
  localVideoHistory.data = localVideoHistory.data.filter(x=>x.recordID!==recordID)
  await AsyncStorage.setItem('LocalVideoHistory', JSON.stringify(localVideoHistory))

}

export const handleAddPosition = async(positions, setPositions, newPosition)=>{
            
  
  const newPositionArray = positions.map(x=> x)
        if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newPosition[0])){
            newPosition = 'X-' + newPosition
        
        }
        newPositionArray.push(newPosition)
        setPositions(newPositionArray.sort())
        await AsyncStorage.setItem('startingPositions', JSON.stringify(newPositionArray.sort()))

    }

  export const handleAddTechnique = async(techniques, setTechniques, newTechnique)=>{
      const newTechniqueArray = techniques.map(x=> x)
      if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newTechnique[0])){
          newTechnique = 'X-' + newTechnique
      
      }
      
      newTechniqueArray.push(newTechnique)
      const sortedArray = newTechniqueArray.sort()
      setTechniques(sortedArray)
      await AsyncStorage.setItem('startingTechniques', JSON.stringify(sortedArray))
      
    }


    













async function retrieveFilteredRollRecords(positionSelection, techniqueSelection){
const recordsArray = []
try{
  
  const rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
  
  if(positionSelection == '' && techniqueSelection == ''){
    for(let record of rollingHistory.data){
      recordsArray.push(record)   
    }
  }
  
  else if(positionSelection !== '' && techniqueSelection == ''){
      for(let record of rollingHistory.data){
          if(record.position == positionSelection){
              recordsArray.push(record)
          }
      }
  }
  else if(techniqueSelection !== '' && positionSelection == ''){
      for(let record of rollingHistory.data){
          if(record.technique == techniqueSelection){
              recordsArray.push(record)
          }
      }
  }
  else if(techniqueSelection !== '' && positionSelection !== ''){
      for(let record of rollingHistory.data){
          if(record.position == positionSelection){
              if(record.technique == techniqueSelection){
                  recordsArray.push(record)
              }    
          }
      }
  }
  
}
catch(error){console.log('RetrievefilteredRollRecords FAILED' + error)}

return recordsArray
}

async function retrieveFilteredDrillRecords(positionSelection, techniqueSelection){
    
  const recordsArray = []
  
  try{
    const drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
    
    if(positionSelection == '' && techniqueSelection == ''){
      for(let record of drillingHistory.data){
        recordsArray.push(record)   
      }
    }
    
    else if(positionSelection !== '' && techniqueSelection == ''){
        for(let record of drillingHistory.data){
            if(record.position == positionSelection){
                recordsArray.push(record)
            }
        }
    }
    else if(techniqueSelection !== '' && positionSelection == ''){
        for(let record of drillingHistory.data){
            if(record.technique == techniqueSelection){
                recordsArray.push(record)
            }
        }
    }
    else if(techniqueSelection !== '' && positionSelection !== ''){
        for(let record of drillingHistory.data){
            if(record.position == positionSelection){
                if(record.technique == techniqueSelection){
                    recordsArray.push(record)
                }
                
            }
        }
    }
    
    

  }
  catch(error){console.log('RetrievefilteredDrillRecords FAILED' + error)}

  return recordsArray
}

async function retrieveFilteredExternalVideoRecords(positionSelection, techniqueSelection){
    
  const recordsArray = []

  try{
    
    const videoHistory = await JSON.parse(await AsyncStorage.getItem('videoHistory'))
    
    
    if(positionSelection == '' && techniqueSelection == ''){
      for(let record of videoHistory.data){
        recordsArray.push(record)   
      }
    }
    
    else if(positionSelection !== '' && techniqueSelection == ''){
        for(let record of videoHistory.data){
            if(record.position == positionSelection){
                recordsArray.push(record)
            }
        }
    }
    else if(techniqueSelection !== '' && positionSelection == ''){
        for(let record of videoHistory.data){
            if(record.technique == techniqueSelection){
                recordsArray.push(record)
            }
        }
    }
    else if(techniqueSelection !== '' && positionSelection !== ''){
        for(let record of videoHistory.data){
            if(record.position == positionSelection){
                if(record.technique == techniqueSelection){
                    recordsArray.push(record)
                }
                
            }
        }
    }
   
    

  }
  catch(error){'RetrievefilteredVIDEORecords FAILED' + error}

  return recordsArray
}




async function retrieveFilteredLocalVideoRecords(){
    try{null }
    catch(error){console.log('RetrievefilteredVIDEORecords FAILED' + error)}
    return []}





