import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import {
  lorelei,
  adventurer,
  croodles,
  adventurerNeutral,
} from "@dicebear/collection";

function Profile({ className }) {
  const avatar = useMemo(() => {
    return createAvatar(adventurer, {
      seed: "Aiden",
      size: 128,
      // ... other options
    }).toDataUri();
  }, []);

  return <img className={className} src={avatar} alt="Avatar" />;
}

export default Profile;
