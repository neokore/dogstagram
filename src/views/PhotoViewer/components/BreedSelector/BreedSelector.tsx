import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Breed } from 'api/dogApi';
import './BreedSelector.scss';
import LoadingImg from 'assets/img/loading.png';
import { BreedProvider } from 'views/PhotoViewer/PhotoViewer';
import { useService } from '@xstate/react';
import { BreedContext, BreedEventType } from 'machine/breedMachine';

export default function BreedSelector() {
  const { t } = useTranslation();
  const service = useContext(BreedProvider);
  const [current, send] = useService(service);
  const { breedList, selectedBreed } = current.context as BreedContext;

  return (
    <div className="BreedSelector">
      <label htmlFor="breedSelect">
        {t('breedSelector.label')}
      </label>
      <select
        id="breedSelect"
        value={selectedBreed || undefined}
        onChange={(event) => send(BreedEventType.select, { name: event.currentTarget.value})}
      >
        {
          !selectedBreed &&
          (<option value={''}>{t('breedSelector.none')}</option>)
        }
        <option value="error">{t('breedSelector.errorBreed')}</option>
        {breedList.map((breed: Breed) => {
          return <option key={breed.id} value={breed.id}>{breed.name}</option>
        })}
      </select>
      <LoadingImagesMsg show={current.matches("idle.loading")}/>
    </div>
  );
};

function LoadingImagesMsg({ show }: { show: boolean; }) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="LoadingImagesMsg">
      <img src={LoadingImg} alt=""/>
      <p>{t('breedSelector.loading')}</p>
    </div>
  );
}