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
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const myItems = useMemo(() => {
    if (!currentUser?._id) return [];

    return clothingItems.filter((item) => {
      const ownerId =
        typeof item.owner === "string" ? item.owner : item.owner?._id;

      return ownerId === currentUser._id;
    });
  }, [clothingItems, currentUser?._id]);

  return (
    <main className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />

      <div className="profile__content">
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
