import "./Profile.css";
import { useContext, useMemo } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  onCardLike,
  onEditProfile,
  onSignOut, // passes to SideBar
}) {
  const currentUser = useContext(CurrentUserContext);

  const myItems = useMemo(() => {
    if (!currentUser?._id) return [];
    return clothingItems.filter((i) => i.owner === currentUser._id);
  }, [clothingItems, currentUser?._id]);

  return (
    <main className="profile">
      <SideBar onSignOut={onSignOut} />
      <div className="profile__content">
        <div className="profile__actions">
          <button className="profile__edit-btn" onClick={onEditProfile}>
            Edit profile
          </button>
        </div>

        <ClothesSection
          clothingItems={myItems}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          handleOpenItemModal={handleOpenItemModal}
          onCardLike={onCardLike}
        />
      </div>
    </main>
  );
}

export default Profile;
