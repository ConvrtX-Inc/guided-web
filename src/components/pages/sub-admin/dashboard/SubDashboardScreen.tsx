import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./SubDashboardScreen.scss";
import MostRecent from "./MostRecent";
import PackageActivityCard from "./PackageActivityCard";
import EventsCard from "./EventsCard";
import NewsFeedsCard from "./NewsFeedsCard";
import ArticlesCard from "./ArticlesCard";
import AdvertismentsCard from "./AdvertismentsCard";
import OutfittersCard from "./OutfittersCard";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import DashboardService from "../../../../services/dashboard/Dashboard.Service";
import { UserAccess } from "../../../../shared/interfaces/UserAccess.interface";

interface IPostSummary {
  UserActivityPostSummary_activity_package_count?: number;
  UserActivityPostSummary_activity_package_views?: number;

  UserActivityPostSummary_advertisement_count?: number;
  UserActivityPostSummary_advertisement_views?: number;

  UserActivityPostSummary_article_count?: number;
  UserActivityPostSummary_article_views?: number;

  UserActivityPostSummary_event_count?: number;
  UserActivityPostSummary_event_views?: number;

  UserActivityPostSummary_newsfeed_count?: number;
  UserActivityPostSummary_newsfeed_views?: number;

  UserActivityPostSummary_outfitter_count?: number;
  UserActivityPostSummary_outfitter_views?: number;
}

const SubDashboardScreen = () => {
  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  const [postData, setPostData] = useState([] as any[]);
  const [postSummary, setPostSummary] = useState({} as IPostSummary);

  const loadPostSummary = useCallback(async () => {
    try {
      await DashboardService.loadUserActivityPostSummary(
        userAccess.user_id || ""
      ).then(
        (res) => {
          if (res.data.length > 0) {
            setPostSummary(res.data[0]);
          } else {
            setPostSummary({
              UserActivityPostSummary_article_count: 0,
              UserActivityPostSummary_article_views: 0,
              UserActivityPostSummary_newsfeed_count: 0,
              UserActivityPostSummary_newsfeed_views: 0,
              UserActivityPostSummary_activity_package_count: 0,
              UserActivityPostSummary_activity_package_views: 0,
              UserActivityPostSummary_outfitter_count: 0,
              UserActivityPostSummary_outfitter_views: 0,
              UserActivityPostSummary_advertisement_count: 0,
              UserActivityPostSummary_advertisement_views: 0,
              UserActivityPostSummary_event_count: 0,
              UserActivityPostSummary_event_views: 0,
            });
          }
        },
        (err) => {
          console.log("Error loadUserActivityPostSummary: ", err);
        }
      );
    } catch (error) {
      console.log("Error loadPostSummary: ", error);
    }
  }, [setPostSummary, userAccess.user_id]);

  const loadSubAdminRecentPosts = useCallback(async () => {
    try {
      await DashboardService.loadSubAdminRecentPosts(
        userAccess.user_id || ""
      ).then(
        (res) => {
          setPostData(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log("Error loadSubAdminRecentPosts:", error);
    }
  }, [setPostData, userAccess.user_id]);

  useEffect(() => {
    loadSubAdminRecentPosts();
    loadPostSummary();
  }, [loadPostSummary, loadSubAdminRecentPosts]);

  return (
    <Container className="sub-dashboard-container">
      <Row className="mt-5">
        <Col>
          <h2>Dashboard</h2>
        </Col>
      </Row>
      <Row className="card-count-info">
        {
          /**Cards here by sub-admin type */
          authCtx.userRole.is_subadmin_others ? (
            <>
              <ArticlesCard
                views={postSummary.UserActivityPostSummary_article_views}
                count={postSummary.UserActivityPostSummary_article_count}
              />
              <EventsCard
                views={postSummary.UserActivityPostSummary_event_views}
                count={postSummary.UserActivityPostSummary_event_count}
              />
              <AdvertismentsCard
                views={postSummary.UserActivityPostSummary_advertisement_views}
                count={postSummary.UserActivityPostSummary_advertisement_count}
              />
              <OutfittersCard
                views={postSummary.UserActivityPostSummary_outfitter_views}
                count={postSummary.UserActivityPostSummary_outfitter_count}
              />
              <PackageActivityCard
                views={
                  postSummary.UserActivityPostSummary_activity_package_views
                }
                count={
                  postSummary.UserActivityPostSummary_activity_package_count
                }
              />
              <NewsFeedsCard
                views={postSummary.UserActivityPostSummary_newsfeed_views}
                count={postSummary.UserActivityPostSummary_newsfeed_count}
              />
            </>
          ) : authCtx.userRole.is_subadmin_nonprofit ? (
            <>
              <PackageActivityCard
                views={
                  postSummary.UserActivityPostSummary_activity_package_views
                }
                count={
                  postSummary.UserActivityPostSummary_activity_package_count
                }
              />
              <EventsCard
                views={postSummary.UserActivityPostSummary_event_views}
                count={postSummary.UserActivityPostSummary_event_count}
              />
              <NewsFeedsCard
                views={postSummary.UserActivityPostSummary_newsfeed_views}
                count={postSummary.UserActivityPostSummary_newsfeed_count}
              />
              <ArticlesCard
                views={postSummary.UserActivityPostSummary_article_views}
                count={postSummary.UserActivityPostSummary_article_count}
              />
            </>
          ) : (
            authCtx.userRole.is_subadmin_guide && (
              <>
                <ArticlesCard
                  views={postSummary.UserActivityPostSummary_article_views}
                  count={postSummary.UserActivityPostSummary_article_count}
                />
                <NewsFeedsCard
                  views={postSummary.UserActivityPostSummary_newsfeed_views}
                  count={postSummary.UserActivityPostSummary_newsfeed_count}
                />
              </>
            )
          )
        }
      </Row>
      <Row className="mt-5">
        <Col className="col-sm">
          <h4>Most Recent Post</h4>
        </Col>
        <Col className="col-sm see-all">
          <Link to="/see-all" className="float-end">
            See all
          </Link>
        </Col>
      </Row>
      <Row className="mb-5">
        <MostRecent mostrecent={postData} />
      </Row>
    </Container>
  );
};

export default SubDashboardScreen;
