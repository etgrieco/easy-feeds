export const OPEN_POPOUT = 'OPEN_POPOUT';
export const CLOSE_POPOUT = 'CLOSE_POPOUT';

export const openPopOut = component => ({
  type: OPEN_POPOUT,
  component
});

export const closePopOut = () => ({
  type: CLOSE_POPOUT,
  component: null
});
