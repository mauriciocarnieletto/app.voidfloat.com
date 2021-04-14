import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayCardHeader,
  grayColor,
} from "../../resources/globalStyles.js";

const cardIconStyle = {
  cardIcon: {
    "&$grayCardHeader,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left",
    },
  },
  grayCardHeader,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
};

export default cardIconStyle;
