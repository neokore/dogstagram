import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'state/rootReducer';
import { fetchBreedList, selectBreed } from 'state/slices/breedSlice';
import { Breed } from 'api/dogApi';
import './BreedSelector.scss';
import LoadingImg from 'assets/img/loading.png';

export default function BreedSelector() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    breedList,
    selectedBreed
  } = useSelector((state: RootState) => state.breeds);

  useEffect(() => {
    dispatch(fetchBreedList())
  }, [dispatch]);

  const handleBreedSelected = (breedId: string) => {
    dispatch(selectBreed(breedId));
  };

  return (
    <div className="BreedSelector">
      <label htmlFor="breedSelect">
        {t('breedSelector.label')}
      </label>
      <select
        id="breedSelect"
        value={selectedBreed || undefined}
        onChange={(event) => handleBreedSelected(event.currentTarget.value)}
      >
        {!selectedBreed && (<option value={''}>{t('breedSelector.none')}</option>) }
        <option value="error">{t('breedSelector.errorBreed')}</option>
        {breedList.map((breed: Breed) => {
          return <option key={breed.id} value={breed.id}>{breed.name}</option>
        })}
      </select>
      <LoadingImagesMsg />
    </div>
  );
};

function LoadingImagesMsg() {
  const { t } = useTranslation();
  const {
    isLoading
  } = useSelector((state: RootState) => state.breeds);

  if (!isLoading) return null;

  return (
    <div className="LoadingImagesMsg">
      <img src={LoadingImg} />
      <p>{t('breedSelector.loading')}</p>
    </div>
  );
}