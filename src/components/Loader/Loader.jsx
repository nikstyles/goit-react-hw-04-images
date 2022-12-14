import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loader}>
      <TailSpin height="80" width="80" color="grey" ariaLabel="loading" />
    </div>
  );
}
