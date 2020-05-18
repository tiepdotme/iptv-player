import React from 'react';
import { WindowScroller, AutoSizer, Grid } from 'react-virtualized';
import 'react-virtualized/styles.css';
import getChannels from '../parsem3u';
import ChannelCard from './channelCard';

// const Channels = ({setSelectedChannel}) => {
//   const [channels, setChannels] = React.useState([]);

//   React.useEffect(() => {
//     const fetchChannels = async () => {
//       const channels = await getChannels();
//       setChannels(channels);
//     }
//     fetchChannels();
//   }, []);

//   const clickHandler = (channel) => {
//     setSelectedChannel(channel);
//   }

//   return (
//     // <div className="flex flex-wrap justify-center">
//     //   {channels.map(channel => {
//     //     return (
//     //       <li key={channel.url} className="list-none h-56 w-48 p-3">
//     //         <ChannelCard clickHandler={clickHandler} channel={channel} />
//     //       </li>
//     //     )
//     //   })}
//     // </div>
//     <List 
//       height={650}
//       itemCount={channels.count}
//       itemSize={250}
//       width={900}
//     >
//       {
//         ({index, style}) => (
//           // <div style={style} className="flex flex-wrap justify-center">
//           //   {channels.map(channel => {
//           //     return (
//           //       <li key={channel.url} className="list-none h-56 w-48 p-3">
//           //         <ChannelCard clickHandler={clickHandler} channel={channel} />
//           //       </li>
//           //     )
//           //   })}
//           // </div>
//           <div style={style}>Row {index}</div>
//         )
//       }
//     </List>
//   );
// };
 
const Channels = ({setSelectedChannel}) => {
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    const fetchChannels = async () => {
      const channels = await getChannels();
      setChannels(channels);
    }
    fetchChannels();
  }, []);

  const clickHandler = (channel) => {
    setSelectedChannel(channel);
  };

  // const [columnCount, setColumnCount] = React.useState(null);

  const Cell = ({ columnIndex, key, rowIndex, style }) => {
    const channelIndex = (rowIndex * 6) + columnIndex; 
    if (!channels[channelIndex]) return; 
    return (
    <li className="list-none" key={key} style={style}>
      <div className="p-3 h-full w-full">
      <ChannelCard clickHandler={clickHandler} channel={channels[channelIndex]} />
      </div>
    </li>
  )};

  // To choose a good number for height & width, go to https://nerdcave.com/tailwind-cheat-sheet and select a size as per Tailwind standards
  const columnWidth = 192; // This is the cell width. Card size will be smaller due to padding
  const rowHeight = 224; // This is the cell height. Card size will be smaller due to padding
  return (
    <div className="min-h-screen container mx-auto">
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {
              ({width}) => {
                const columnCount = Math.floor(width/columnWidth);
                return (
                  <Grid
                    autoHeight
                    cellRenderer={Cell}
                    columnCount={columnCount}
                    columnWidth={columnWidth}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowCount={Math.ceil(channels.length/columnCount)}
                    rowHeight={rowHeight}
                    width={width}
                    className = "flex justify-center"
                  />
                )
              }
            }
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
};

export default Channels;