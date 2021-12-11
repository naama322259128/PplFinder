import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { tmpdir } from "os";

const UserList = ({ users, isLoading ,PageNumber}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filtersCountry, setFiltersCountry] = useState([]);
  const [userList, setUserList] = useState([]);
  const [favorites, setFavorites] = useState([])

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleScroll = (e) => {
    let bottom = Math.abs(
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 1
    );
    if (bottom) PageNumber();
  }

  const handleFiltersCountry = (country) => {
    let listCountry = filtersCountry;
    if (event.target.checked)
      listCountry.push(country)
    else {
      var index = listCountry.indexOf(country);
      if (index !== -1) {
        listCountry.splice(index, 1);
      }
    }
    setFiltersCountry(listCountry);
    if (filtersCountry.length != 0) {
      let tmp = [];
      debugger;
      filtersCountry.map((c) => {

        users.map((user) => {
          if (user.location.country == c)
            tmp.push(user)
        })
      })
      setUserList(tmp);
      return;
    }
    else
      setUserList(users);

  }

  useEffect(() => {
    setUserList(users);
    if (!localStorage.getItem("favorites"))
      localStorage.setItem("favorites", JSON.stringify([]));
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, [])


  return (
    <S.UserList>
      <S.Filters>

        <CheckBox value="BR" label="Brazil" onChange={() => { handleFiltersCountry("Brazil") }} />
        <CheckBox value="AU" label="Australia" onChange={() => { handleFiltersCountry("Australia") }} />
        <CheckBox value="CA" label="Canada" onChange={() => { handleFiltersCountry("Canada") }} />
        <CheckBox value="DE" label="Germany" onChange={() => { handleFiltersCountry("Germany") }} />
        <CheckBox value="DE" label="United Kingdom" onChange={() => { handleFiltersCountry("United Kingdom") }} />
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {userList && userList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user ?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user ?.name.title} {user ?.name.first} {user ?.name.last}
                </Text>
                <Text size="14px">{user ?.email}</Text>
                <Text size="14px">
                  {user ?.location.street.number} {user ?.location.street.name}
                </Text>
                <Text size="14px">
                  {user ?.location.city} {user ?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={favorites &&
                  favorites.findIndex(f => f === user) > -1
                  || index === hoveredUserId}
                onClick={() => {
                  let favoritesList = JSON.parse(localStorage.getItem("favorites"));
                  let i = favoritesList.indexOf(user);
                  if (i == -1) favoritesList.push(user)
                  else favoritesList.splice(i, 1);
                  localStorage.setItem("favorites", JSON.stringify(favoritesList));
                  setFavorites(favoritesList);
                 }}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
