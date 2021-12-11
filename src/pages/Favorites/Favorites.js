import React, { useEffect, useState } from "react";
import * as S from "./style";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
const Favorites = () => {


    useEffect(() => {
        if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify([]));
        setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }, []);

    const [favorites, setFavorites] = useState([]);

    return (
        <S.Content>
            <S.Header><Text size="36px" bold>Favorites</Text></S.Header>
            <S.UserList>
                <S.List>
                    {favorites && favorites.map((user, index) => {
                        return (
                            <S.User key={index}>
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
                                    isVisible={true}
                                    onClick={() => {
                                        let arr = JSON.parse(localStorage.getItem("favorites"));
                                        let ind = arr.findIndex(i => i.login.uuid === user.login.uuid);
                                        arr.splice(ind, 1);
                                        localStorage.setItem("favorites", JSON.stringify(arr));
                                        setFavorites(arr);
                                    }}>
                                    <IconButton>
                                        <FavoriteIcon color='error' />
                                    </IconButton>
                                </S.IconButtonWrapper>
                            </S.User>
                        );
                    })} 

                </S.List>
            </S.UserList>
        </S.Content>
    );
};

export default Favorites;
