import React from 'react';
import getChannels from '../parsem3u';
import ChannelCard from './channelCard';

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
  }

  return (
    <div className="flex flex-wrap justify-center">
      {channels.map(channel => {
        return (
          <li key={channel.url} className="list-none h-56 w-48 p-3">
            <ChannelCard clickHandler={clickHandler} channel={channel} />
          </li>
        )
      })}
    </div>
  );
};

export default Channels;