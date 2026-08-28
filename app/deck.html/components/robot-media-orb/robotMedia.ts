export type RobotMediaAsset = {
  id: string;
  title: string;
  kind: "image" | "video";
  src: string;
  poster?: string;
};

const image = (id: string, title: string): RobotMediaAsset => ({ id, title, kind: "image", src: `/images/robot-olympics/${id}` });
const video = (id: string, title: string): RobotMediaAsset => ({ id, title, kind: "video", src: `/videos/robot-olympics/${id}.mp4`, poster: `/videos/robot-olympics/${id}.jpg` });

export const ROBOT_MEDIA: RobotMediaAsset[] = [
  image("b1_01_solo_sprint_midstride.jpg", "100 metre sprint"),
  image("b1_02_pack_race_curve.jpg", "Pack race on the curve"),
  image("b1_03_red_vs_white_duel.jpg", "Sprint duel"),
  image("b1_04_finish_line_chaos.jpg", "Finish-line intensity"),
  image("b1_05_table_tennis_match.jpg", "Robot table tennis"),
  image("b1_06a_flag_bearer_horse.jpg", "Opening flag bearer"),
  image("b1_06b_flag_bearer_closeup.jpg", "Opening ceremony close-up"),
  image("b1_07a_tug_of_war_referee.jpg", "Tug-of-war referee"),
  image("b1_07b_tug_of_war_action1.jpg", "Humanoid tug-of-war"),
  image("b1_07c_tug_of_war_action2.jpg", "Teams under load"),
  image("b1_08_weightlifting_hurdle.jpg", "Power and precision"),
  image("b1_09a_booster_formation.jpg", "Booster robot formation"),
  image("b1_09b_booster_longjump.jpg", "Robot long jump"),
  image("b1_09c_booster_scenario.jpg", "Scenario demonstration"),
  image("b1_09d_booster_parade.jpg", "Track formation"),
  image("b1_10_agibot_medals_team.jpg", "AGIBOT team ceremony"),
  image("b2_01_football_kick_match.jpg", "Robot football strike"),
  image("b2_02_football_scramble.jpg", "Football scramble"),
  image("b2_04a_opening_parade_formation.jpg", "Opening parade"),
  image("b2_04b_opening_parade_overview.jpg", "Stadium opening"),
  image("b2_05a_boxing_bout_exchange.png", "Humanoid boxing"),
  image("b2_05b_boxing_bout_clash.png", "Boxing exchange"),
  image("b2_06a_moments_tug_pingpong.jpg", "Competition moments"),
  image("b2_06b_moments_boxing_ring.jpg", "Boxing ring overview"),
  image("b2_06c_moments_hurdle_jump.jpg", "Hurdle jump"),
  image("b2_06d_moments_running_track.jpg", "Running track"),
  image("b2_07a_sprint_finals_lineup.jpg", "Sprint final lineup"),
  image("b2_07b_sprint_finals_burst.jpg", "Acceleration burst"),
  image("b2_07c_sprint_finals_duel.jpg", "Final straight duel"),
  image("b2_07d_sprint_finals_finish.jpg", "Sprint finish"),
  image("b2_08_sprint_fail_red_photo.jpg", "Limits under pressure"),
  image("b2_09a_closing_parade_podium.jpg", "Closing podium"),
  image("b2_09b_closing_parade_team.jpg", "Closing team parade"),
  image("b2_09c_closing_parade_robots.jpg", "Mass robot showcase"),
  image("b2_09d_closing_parade_celebration.jpg", "Final celebration"),
  image("b2_10_foam_padded_runner_photo.jpg", "Crash-cushion runner"),
  video("01_sprint_100m_record", "Sprint record run"),
  video("02_sprint_vs_bolt", "Humanoid sprint benchmark"),
  video("03_high_jump", "High-jump attempt"),
  video("04_football_siuuu", "Football celebration"),
  video("05_samba_dance", "Samba performance"),
  video("06_hiphop_dance", "Hip-hop performance"),
  video("07_taichi_martial_arts", "Tai Chi demonstration"),
  video("07b_taichi_alt", "Martial-arts demonstration"),
  video("08_cute_longjump", "Small humanoid long jump"),
  video("09_fail_compilation", "Robots learning their limits"),
  video("09b_crash_cushion", "Crash-cushion test"),
  video("10_highlights_recap", "Games highlights"),
  video("10b_broader_recap", "Robot Games recap"),
  video("b2_01_football_match_video", "Football match"),
  video("b2_05_boxing_bout_video", "Boxing bout"),
  video("b2_08_sprint_fail_red_video", "Sprint recovery"),
  video("b2_10_foam_padded_runner_video", "Protected runner"),
];
