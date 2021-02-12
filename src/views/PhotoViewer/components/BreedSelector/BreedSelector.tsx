import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'state/rootReducer';
import { fetchBreedList, selectBreed } from 'state/breed/breedSlice';
import { Breed } from 'api/dogApi';
import './BreedSelector.scss';

export default function BreedSelector() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    breedList
  } = useSelector((state: RootState) => state.breeds);

  useEffect(() => {
    dispatch(fetchBreedList())
  }, [dispatch]);

  const handleBreedSelected = (breedId: string) => {
    dispatch(selectBreed(breedId));
  };

  return (
    <>
      <label htmlFor="breedSelect">
        {t('Select a breed')}
      </label>
      <select
        id="breedSelect"
        onChange={(event) => handleBreedSelected(event.currentTarget.value)}
      >
        <option>{t('None')}</option>
        {breedList.map((breed: Breed) => {
          return <option key={breed.id} value={breed.id}>{breed.name}</option>
        })}
      </select>
    </>
  );
}