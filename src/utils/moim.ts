import {AgeGroup} from 'constants/screens/MoimDetailScreens/age';

function getAgeGroup(age: number) {
  if (age < 0) {
    return AgeGroup.INVALID;
  } else if (age < 10) {
    return AgeGroup.INFANT;
  } else if (age < 20) {
    return AgeGroup.TEENS;
  } else if (age < 30) {
    return AgeGroup.TWENTIES;
  } else if (age < 40) {
    return AgeGroup.THIRTIES;
  } else if (age < 50) {
    return AgeGroup.FORTIES;
  } else if (age < 60) {
    return AgeGroup.FIFTIES;
  } else if (age < 70) {
    return AgeGroup.SIXTIES;
  } else if (age < 80) {
    return AgeGroup.SEVENTIES;
  } else if (age < 90) {
    return AgeGroup.EIGHTIES;
  } else if (age < 100) {
    return AgeGroup.NINETIES;
  } else {
    return AgeGroup.HUNDRED_PLUS;
  }
}

export {getAgeGroup};
