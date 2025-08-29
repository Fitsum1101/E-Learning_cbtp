import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";

import {
  adventurer,
  croodles,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  micah,
  initials,
  pixelArt,
  bottts,
} from "@dicebear/collection";

function Profile({ seed, className, size, style = "adventurer" }) {
  const collection = {
    adventurer,
    croodles,
    "adventurer-neutral": adventurerNeutral,
    "avataaars-neutral": avataaarsNeutral,
    avataaars,
    micah,
    initials,
    pixelArt,
    bottts,
  };
  const avatar = useMemo(() => {
    return createAvatar(collection[style], {
      seed: seed,
      size,
    }).toDataUri();
  }, [seed, size]);

  return <img className={className} src={avatar} alt="Avatar" />;
}

export default Profile;
