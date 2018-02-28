import { RequestStatus } from '../constants';

export default (status, onLoading, onSuccess, onError) => {
  if (
    status === RequestStatus.UNITIALIZED ||
    status === RequestStatus.PENDING
  ) {
    return onLoading();
  } else if (status === RequestStatus.SUCCESS) {
    return onSuccess();
  } else {
    return onError();
  }
};
