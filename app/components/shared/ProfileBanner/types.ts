export interface Props {
  id?: any;
  fullName?: string;
  status?: string;
  location?: string;
  isFriend?: boolean;
  imageUrl?: string;
  availability?: any;
  hasEvent?: boolean;
  onJoinEvent?: () => void;
  isProfilePage?: boolean;
  events?: any[];
  transparent?: boolean;
}
