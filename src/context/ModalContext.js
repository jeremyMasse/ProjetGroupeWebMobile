import React, {useCallback, useRef, useMemo, createContext} from 'react';
import {Text} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import CardRow from '../components/CardRow';
import {useNavigation} from '@react-navigation/native';
import ActionRow from '../components/ActionRow';
import Share from 'react-native-share';
import {deleteTrackFromPlaylist} from '../services/Playlist.service';
import {useTranslation} from 'react-i18next';

export const ModalContext = createContext(null);

const ModalProvider = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const {modal} = useSelector(state => state.modal);
  const type = useSelector(state => state.modal.type);

  // hooks
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderBackdrop = props => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const sharePlaylist = async options => {
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <ModalContext.Provider
      value={{
        sheetRef,
        snapPoints,
        handleSheetChange,
        handleSnapPress,
        handleClosePress,
      }}>
      {props.children}
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: '#383737',
        }}
        handleIndicatorStyle={{backgroundColor: '#a1a1a1'}}
        backdropComponent={renderBackdrop}>
        {/* Modal Playlist  */}
        {type === 'playlist' && (
          <>
            <CardRow
              img={modal.images && modal.images[0] && modal.images[0].url}
              width={50}
              height={50}
              title={modal.name}
              artist={modal.owner && modal.owner.display_name}
            />
            <ActionRow
              title={t('playlist.see')}
              icon="musical-notes-outline"
              onPress={() => {
                navigation.navigate('Playlist', {playlist: modal.id});
                handleClosePress();
              }}
            />
            <ActionRow
              title={t('playlist.sharePlaylist')}
              icon="share-social-outline"
              onPress={() => {
                sharePlaylist({
                  // title: `${playlist.owner.display_name} shared his spotify playlist with you`,
                  url: modal.external_urls.spotify,
                });
                handleClosePress();
              }}
            />
          </>
        )}
        {/* Modal Playlist  */}
        {type === 'track' && (
          <>
            <CardRow
              img={modal.track?.album?.images[0].url}
              width={50}
              height={50}
              title={modal.track?.name}
              artist={modal.track?.artists?.map(artist => `${artist.name}, `)}
            />
            <ActionRow
              title={t('playlist.removeMusic')}
              icon="remove-circle-outline"
              onPress={() =>
                deleteTrackFromPlaylist(
                  token.access_token,
                  modal.playlist.id,
                  modal.track.track.uri,
                  modal.track.track.name,
                  modal.playlist.name,
                  modal.setTracks,
                )
              }
            />
            <ActionRow
              title={t('playlist.share')}
              icon="share-social-outline"
            />
          </>
        )}
      </BottomSheet>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
