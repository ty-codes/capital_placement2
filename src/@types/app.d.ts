export interface IObject {
  show?: boolean;
  mandatory?: boolean;
  internalUse?: boolean;
}

export interface IProfile {
  education: IObject;
  experience: IObject;
  resume: IObject;
}

export interface IForm {
  education?: IObject;
  experience?: IObject;
  resume?: IObject;
  dob?: IObject;
  id?: IObject;
  nationality?: IObject;
  phone?: IObject;
  residence?: IObject;
  profileQuestions?: IQuestion[];
  personalQuestions?: IQuestion[];
}

export interface IQuestion {
  question?: string;
  type?: string;
  other?: boolean;
  disqualify?: boolean;
  maxChoice?: number;
  id?: number;
  choices?: string[];
  timeType?: string;
  additionalInformation?: string;
  maxTime?: string | number;
}

export type AppContextType = {
  profile?: IForm | null;
  setProfile?: React.Dispatch<React.SetStateAction<IForm | null>>;
  personalInformation?: IForm | null;
  setPersonalInformation?: React.Dispatch<React.SetStateAction<IForm | null>>;
  setCustomisedQuestions?: React.Dispatch<
    React.SetStateAction<IQuestion[] | []>
  >;
  personalTypes: string[] | [];
  profileTypes: string[] | [];
  setPersonalTypes: React.Dispatch<React.SetStateAction<string[] | []>>,
  setProfileTypes: React.Dispatch<React.SetStateAction<string[] | []>>,
  customisedTypes: string[] | [];
  setCustomisedTypes: React.Dispatch<React.SetStateAction<string[] | []>>,
  customizedQuestions?: IQuestion[] | []
};
