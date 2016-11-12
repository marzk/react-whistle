import React from 'react';
import {
  Whistle,
} from '../../dist/whistle';

const styles = {
  dialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '400px',
    height: '300px',
    marginLeft: '-200px',
    marginTop: '-150px',
  },
};

const Dialog = props => {
  return (
    <div style={styles.dialog}>
      <button onClick={props.onConfirm}>Confirm</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  );
};

export default function (props) {
  const handleClick = e => {
    Whistle(Dialog)((resolve, reject) => ({
      onConfirm() {
        resolve();
      },
      onCancel() {
        reject();
      }
    })).then(() => {
      alert('confirmed');
    }).catch(() => {
      alert('canceled');
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Btn</button>
    </div>
  );
}
