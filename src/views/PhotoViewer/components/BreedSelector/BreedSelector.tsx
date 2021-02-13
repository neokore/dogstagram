import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'state/rootReducer';
import { fetchBreedList, selectBreed } from 'state/slices/breedSlice';
import { Breed } from 'api/dogApi';
import './BreedSelector.scss';

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
    </div>
  );
};