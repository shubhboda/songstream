import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResults = ({ 
  results = {}, 
  searchQuery = '',
  onPlaySong = () => {},
  onFollowArtist = () => {},
  onSaveAlbum = () => {},
  onSavePlaylist = () => {},
  onSeeAll = () => {}
}) => {
  const [playingId, setPlayingId] = useState(null);

  const mockResults = {
    topResults: [
      {
        id: 1,
        type: 'song',
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        album: 'Midnights',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: '3:20',
        plays: '2.1B'
      },
      {
        id: 2,
        type: 'artist',
        name: 'Taylor Swift',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
        followers: '89.2M',
        verified: true
      }
    ],
    songs: [
      {
        id: 1,
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        album: 'Midnights',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: '3:20',
        plays: '2.1B'
      },
      {
        id: 2,
        title: 'Lavender Haze',
        artist: 'Taylor Swift',
        album: 'Midnights',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: '3:22',
        plays: '1.8B'
      },
      {
        id: 3,
        title: 'Karma',
        artist: 'Taylor Swift',
        album: 'Midnights',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: '3:34',
        plays: '1.5B'
      }
    ],
    artists: [
      {
        id: 1,
        name: 'Taylor Swift',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
        followers: '89.2M',
        verified: true,
        genres: ['Pop', 'Country']
      },
      {
        id: 2,
        name: 'Ed Sheeran',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        followers: '67.8M',
        verified: true,
        genres: ['Pop', 'Folk']
      }
    ],
    albums: [
      {
        id: 1,
        title: 'Midnights',
        artist: 'Taylor Swift',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        year: 2022,
        tracks: 13,
        type: 'Album'
      },
      {
        id: 2,
        title: 'folklore',
        artist: 'Taylor Swift',
        artwork: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
        year: 2020,
        tracks: 16,
        type: 'Album'
      }
    ],
    playlists: [
      {
        id: 1,
        title: 'Taylor Swift Essentials',
        creator: 'Spotify',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        tracks: 50,
        followers: '2.3M',
        description: 'The essential Taylor Swift tracks'
      },
      {
        id: 2,
        title: 'Pop Hits 2024',
        creator: 'Music Charts',
        artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
        tracks: 75,
        followers: '1.8M',
        description: 'The biggest pop hits of 2024'
      }
    ]
  };

  const displayResults = Object.keys(results)?.length > 0 ? results : mockResults;

  const handlePlaySong = (song) => {
    setPlayingId(playingId === song?.id ? null : song?.id);
    onPlaySong(song);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000)?.toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  if (!searchQuery) return null;

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Top Results */}
      {displayResults?.topResults && displayResults?.topResults?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Top Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayResults?.topResults?.map((result) => (
              <div
                key={`${result?.type}-${result?.id}`}
                className="p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-spring group cursor-pointer"
              >
                {result?.type === 'song' ? (
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={result?.artwork}
                        alt={result?.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handlePlaySong(result)}
                        className="absolute inset-0 m-auto w-8 h-8 opacity-0 group-hover:opacity-100 transition-spring"
                      >
                        <Icon name={playingId === result?.id ? "Pause" : "Play"} size={16} />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{result?.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{result?.artist}</p>
                      <p className="text-xs text-muted-foreground">{result?.plays} plays</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={result?.image}
                        alt={result?.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      {result?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{result?.name}</h4>
                      <p className="text-sm text-muted-foreground">Artist</p>
                      <p className="text-xs text-muted-foreground">{formatNumber(result?.followers?.replace(/[^\d]/g, ''))} followers</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Songs */}
      {displayResults?.songs && displayResults?.songs?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Songs</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSeeAll('songs')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              See all
            </Button>
          </div>
          <div className="space-y-2">
            {displayResults?.songs?.slice(0, 5)?.map((song) => (
              <div
                key={song?.id}
                className="flex items-center space-x-4 p-3 hover:bg-surface/50 rounded-lg transition-spring group"
              >
                <div className="relative">
                  <Image
                    src={song?.artwork}
                    alt={song?.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handlePlaySong(song)}
                    className="absolute inset-0 m-auto w-6 h-6 opacity-0 group-hover:opacity-100 transition-spring"
                  >
                    <Icon name={playingId === song?.id ? "Pause" : "Play"} size={12} />
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{song?.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{song?.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground font-mono">{song?.duration}</span>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Icon name="Heart" size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Icon name="MoreHorizontal" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Artists */}
      {displayResults?.artists && displayResults?.artists?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Artists</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSeeAll('artists')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayResults?.artists?.slice(0, 6)?.map((artist) => (
              <div
                key={artist?.id}
                className="p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-spring text-center group"
              >
                <div className="relative mb-3">
                  <Image
                    src={artist?.image}
                    alt={artist?.name}
                    className="w-20 h-20 mx-auto object-cover rounded-full"
                  />
                  {artist?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-foreground truncate mb-1">{artist?.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{formatNumber(artist?.followers?.replace(/[^\d]/g, ''))} followers</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFollowArtist(artist)}
                  className="w-full"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Albums */}
      {displayResults?.albums && displayResults?.albums?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Albums</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSeeAll('albums')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayResults?.albums?.slice(0, 6)?.map((album) => (
              <div
                key={album?.id}
                className="p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-spring group"
              >
                <div className="relative mb-3">
                  <Image
                    src={album?.artwork}
                    alt={album?.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute bottom-2 right-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-spring"
                  >
                    <Icon name="Play" size={16} />
                  </Button>
                </div>
                <h4 className="font-semibold text-foreground truncate mb-1">{album?.title}</h4>
                <p className="text-sm text-muted-foreground truncate mb-1">{album?.artist}</p>
                <p className="text-xs text-muted-foreground">{album?.year} • {album?.tracks} tracks</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Playlists */}
      {displayResults?.playlists && displayResults?.playlists?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Playlists</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSeeAll('playlists')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayResults?.playlists?.slice(0, 6)?.map((playlist) => (
              <div
                key={playlist?.id}
                className="p-4 bg-surface border border-border rounded-lg hover:bg-surface/80 transition-spring group"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={playlist?.artwork}
                      alt={playlist?.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute inset-0 m-auto w-8 h-8 opacity-0 group-hover:opacity-100 transition-spring"
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate mb-1">{playlist?.title}</h4>
                    <p className="text-sm text-muted-foreground truncate mb-1">By {playlist?.creator}</p>
                    <p className="text-xs text-muted-foreground mb-2">{playlist?.tracks} songs • {formatNumber(playlist?.followers?.replace(/[^\d]/g, ''))} likes</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{playlist?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;