import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, changePageNumber }) => {

  const handleMouseEnter = (index) => { setHoveredUserId(index); };
  const [hoveredUserId, setHoveredUserId] = useState();
  const handleMouseLeave = () => { setHoveredUserId(); };

  const [usersArray, setUsersArray] = useState(null);//The people who will see them
  const [filters, setFilters] = useState([]);//The countries that the people from these countries, we will represent
  const [favorites, setFavorites] = useState([])//The favorite people, to have a pink heart


  useEffect(() => {
    setUsersArray(users);
    if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify([]));
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, [])

  const handleScroll = (e) => {
    let bottom = Math.abs(
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 1
    );
    if (bottom) changePageNumber();
  }

  const handleFilters = (country) => {

    let tmp = filters;
    if (event.target.checked) tmp.push(country);
    else tmp.splice(tmp.indexOf(country), 1);
    setFilters(tmp);
    if (filters.length == 0) {
      setUsersArray(users);
      return;
    }

    let arr = [];
    for (var i = 0; i < users.length; i++) {
      let c = users[i].location.country;
      if (filters.indexOf(c) > -1) arr.push(users[i]);
    }
    setUsersArray(arr);

  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={() => handleFilters("Brazil")} value="BR" id="Brazil" label="Brazil" />
        <CheckBox onChange={() => handleFilters("Australia")} value="AU" id="Australia" label="Australia" />
        <CheckBox onChange={() => handleFilters("Canada")} value="CA" id="Canada" label="Canada" />
        <CheckBox onChange={() => handleFilters("Germany")} value="DE" id="Germany" label="Germany" />
        <CheckBox onChange={() => handleFilters("Turkey")} value="EU" id="Germany" label="Turkey" />
      </S.Filters>

      <S.List onScroll={handleScroll}>
        {usersArray && usersArray.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={favorites && favorites.findIndex(f => f === user.login.uuid) > -1 || index === hoveredUserId}
                onClick={() => {
                  let arr = JSON.parse(localStorage.getItem("favorites"));
                  let ind = arr.indexOf(user.login.uuid);
                  if (ind == -1) arr.push(user.login.uuid)
                  else arr.splice(ind, 1);
                  localStorage.setItem("favorites", JSON.stringify(arr));
                  setFavorites(arr);

                }}>
                <IconButton>
                  <FavoriteIcon color={favorites && favorites.findIndex(f => f === user.login.uuid) === -1 ? '' : 'error'} />
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