const Profile = ({ name }: any) => {
  return (
    <div className="flex items-center gap-4 font-semibold">
      <span className="bg-brand-1 w-8 h-8 rounded-full text-grey-10 text-center relative">
        <p className="relative top-1 heading-7-500">{name.split(' ').map((letter:string) => letter.charAt(0))}</p>
      </span>
      <p>{name}</p>
    </div>
  );
};

export default Profile;
