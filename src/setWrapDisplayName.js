import getDisplayName from 'recompose/getDisplayName';

export default function setWrapDisplayName(wrapName, Component) {
  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${wrapName}(${getDisplayName(Component)})`;
  }
};

