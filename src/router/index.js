import React from "react";
import { Redirect } from "react-router-dom";

import YHDiscover from "../pages/discover";

import YHMine from "@/pages/mine";
import YHFriend from "@/pages/friend";

import YHRecommend from "../pages/discover/c-pages/recommend";
import YHRanking from "../pages/discover/c-pages/ranking";
import YHSongs from "../pages/discover/c-pages/songs";
import YHDjradio from "../pages/discover/c-pages/djradio";
import YHArtist from "../pages/discover/c-pages/artist";
import YHAlbum from "../pages/discover/c-pages/album";

const router = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: YHDiscover,
    routers: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: YHRecommend,
      },
      {
        path: "/discover/ranking",
        component: YHRanking,
      },
      {
        path: "/discover/songs",
        component: YHSongs,
      },
      {
        path: "/discover/djradio",
        // exact: true,
        component: YHDjradio,
      },
      {
        path: "/discover/artist",
        component: YHArtist,
      },
      {
        path: "/discover/album",
        component: YHAlbum,
      },
      // {
      //   path: "/discover/player",
      //   component: YHPlayer,
      // },
    ],
  },
  {
    path: "/mine",
    component: YHMine,
  },
  {
    path: "/friend",
    component: YHFriend,
  },
];

export default router;
