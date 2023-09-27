What happens in App Navigation:

On initial start:

-Modal Container is loaded. Then child modals are loaded.
-Bottom Navigation Container is then loaded.
-Default Navigation Tab "DashboardTab" is loaded
-DashboardChild RollingScreen is loaded
-DashboardChild TutorialsScreen is loaded
-DashboardChild NotesScreen is loaded.

NOTHING ELSE LOADS AT THIS POINT UNTIL USER CHANGES TABS

\*\*WHEN USER SELECTS A NEW TAB:
-New Tab is loaded but previous tab selections do not rerender. They stay loaded and do not update on tab navigations.

\*\*RECORD TAB
-When User selects this tab:
-VideoCameraScreen renders 4 times
-Roll Review Screen Loads
-All VideoPlayBack screens are rendered twice in the flatlist and contain about 10 playback status updates

\*\*NOTE If VideoCameraScreen is rendered directly by the Bottom Navigation bar, the camera does not turn off. If we use it as a child of material tob navigator, the camera turns off on screen change, however if we use it as a child of the bottom navigator, it does not.

Does the problem appear to come from screen changes themselves? Or because of multiple camera-dependent screens all trying to use the camera at the same time.

    -By inserting the VideoCameraScreen and RollReviewScreen in the bottom navigation, we were able to both play videos in one tab and record videos in the other tab while navigating back and forth.  This makes me think it is some kind of rendering issue in material top tab navigator.

1.Modify RecordVideoRecord so that it takes a picture as well (Thumbnail) and records the thumbnail to the video record.  
2. FOr Both Roll Review (rendering a flatlist of VideoPlayBackScreens) and RollingScreen (rendering a flatlist of ClippedVideoPlaybackScreens), use onViewablechange props to configure flatlist so that if an item is viewable, it is a a video component, otherwise substitute it for a thumbnail. That way only 1 or 2 videos can be loading simulateously.

RUN TEST and see if app stops crashing when you sub in thumnails.

Solved a very tricky bug. Some of my charts were working but others were not. It appeared to be random. The "wins by technique" chart was not updating even though the 'losses by technique' column was updating and I compared all the functionality and state of the inputs one at a time side by side to see how they could differ. Ultimately, they spit out the same result. I looked at how the props were passed to the pie charts and the props were exactly the same. This was baffling. Finally, I thought "perhaps there is a difference between the type of data I am passing them". It occured to me the the input I was expecting to see as a part of the chart was an armbar and that was the first item of the techniques list. Then I remembered that I had started the data iteration at 1 instead of 0 because the labels used to be included in the list. That's what I get for being ghetto about it the first time. Lots of learning . Great job finding a difficult bug that was very unexpected.

Is original data getting from App.js to Dashboard? -- YES
Is it displaying? -- YES
Is updated state getting from App.js to component -- YES
Is it displaying -- NO

App.js infinite rendering when handleAddPosition is executed.
-is handleAddposition continuously executing? - NO
-is 'positions" value in App.js continually changing? - the string value appears the same. need to check the reference
-is the useEffect continuous triggered in app.js? - yes
-if positions is removed from dependency array, does useEffect constantly trigger? - NO

hypothesis - string value does not appear to be changing, but the react is treating the value as changing. Perhaps the reference is changing? Why does react view this as changing?

Does loadpositionsandTechniques view storedPositions and state positions as different? - NO

Does our ELSE statement constantly cause a rerender?

Positions registers as changed only once. It causes one rerender and never resets to starting values.

Techniques registers as changed every time. It causes constant re-renders and

Technique is stored as a unsorted list. It appears in state as a sorted list. It is told to be stored in state to match unsorted list. ???
-Does parsing something from async storage return a stored array?

sort Modifies the list in place and we are directly modifying state somewhere which we DEFINITELY NEED TO FIX!!!!!!

ok so we found out that we never actually 'setState' to a sorted list directly. However, we still kept ending up with a sorted list. Eventually we thought, perhaps we are sorting the list in place by accident. sure enough, when you look up sort(), it modifies a list in place. We were updating state without using setState and hadn't even considered how that would happen. Always make copies of arrays if you don't need the reference to the original. It will save you a fooking hassle.

When you add a new position or technique from the modal and then add a note from that modal, the note doesn't get recorded. However, it does get recorded the NEXT time you do it. Also, if you back out of the modal and reenter it, the first record will be recorded.

Hypotheses: Either the dropdown cannot select the newly input value, or the data is validated prior to being recorded against a list of valid values. Lets check and see.
