import React, {
  useCallback,
  useRef,
  useMemo,
  createContext,
  useState,
} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import CardRow from '../components/CardRow';
import {useNavigation} from '@react-navigation/native';
import ActionRow from '../components/ActionRow';
import Share from 'react-native-share';
import {deleteTrackFromPlaylist} from '../services/Playlist.service';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

export const ModalContext = createContext(null);

const ModalProvider = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const token = useSelector(state => state.user.token);
  const {modal} = useSelector(state => state.modal);
  const type = useSelector(state => state.modal.type);
  const [modalPlaylist, setModalPlaylist] = useState([]);
  const [modalTracks, setModalTracks] = useState([]);

  // hooks
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);

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

  const handleDelete = async () => {
    try {
      const res = await deleteTrackFromPlaylist(
        token.access_token,
        modalPlaylist.id,
        modal.track.uri,
        modal.track.name,
        modalPlaylist.name,
      );
      if (res.snapshot_id) {
        const updatedGlobalTracks = modalTracks.filter(
          track => track.id !== modal.track.id,
        );

        setModalTracks(updatedGlobalTracks);
      }
    } catch (error) {
      console.log('Error while deleting track:', error);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        sheetRef,
        snapPoints,
        handleSnapPress,
        handleClosePress,
        setModalPlaylist,
        setModalTracks,
        modalTracks,
      }}>
      {props.children}
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: '#383737',
        }}
        handleIndicatorStyle={{backgroundColor: '#a1a1a1'}}
        backdropComponent={renderBackdrop}>
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
        {type === 'track' && (
          <>
            <ModalHeader>
              <CardRow
                img={modal.track?.album?.images[0].url}
                width={50}
                height={50}
                title={modal.track?.name}
                artist={modal.track?.artists?.map(artist => `${artist.name}, `)}
              />
            </ModalHeader>
            <ActionRow
              title={t('playlist.removeMusic')}
              icon="remove-circle-outline"
              onPress={() => handleDelete()}
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

const ModalHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

export default ModalProvider;
