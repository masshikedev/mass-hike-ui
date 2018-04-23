import { RequestStatus } from '../constants';

const combineStatus = (...statuses) => {
  let numUninitialized = 0;
  let numSuccess = 0;
  statuses.forEach(status => {
    if (status === RequestStatus.ERROR) {
      return RequestStatus.ERROR;
    }
    numUninitialized += status === RequestStatus.UNITIALIZED ? 1 : 0;
    numSuccess += status === RequestStatus.SUCCESS ? 1 : 0;
  });
  if (numUninitialized === statuses.length) {
    return RequestStatus.UNITIALIZED;
  } else if (numSuccess === statuses.length) {
    return RequestStatus.SUCCESS;
  } else {
    return RequestStatus.PENDING;
  }
};

export default combineStatus;
