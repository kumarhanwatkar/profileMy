import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaStar, FaProjectDiagram, FaCertificate, FaCubes, FaLayerGroup } from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { Section, Badge } from '../ui';
import { profileData, educationData, skillsData, projectsData, experienceData, certificationsData, achievementsData } from '../../data';

// Icon mapping for skill icons
const iconMap = {
  'SiJavascript': SiIcons.SiJavascript,
  'SiTypescript': SiIcons.SiTypescript,
  'SiReact': SiIcons.SiReact,
  'SiNodedotjs': SiIcons.SiNodedotjs,
  'SiExpo': SiIcons.SiExpo,
  'SiFirebase': SiIcons.SiFirebase,
  'SiMysql': SiIcons.SiMysql,
  'SiMongodb': SiIcons.SiMongodb,
  'SiAndroid': SiIcons.SiAndroid,
};

const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};

export default function About() {
  const topSkills = skillsData.topSkills;

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know more about my background and what drives me"
      className="bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="grid gap-12">
        {/* Bio Section */}
        <motion.div
          {...ANIMATION_CONFIG}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-center leading-relaxed text-slate-600 dark:text-slate-400">
            {profileData.bio.long}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column */}
          <LeftColumn topSkills={topSkills} />

          {/* Right Column */}
          <RightColumn />
        </div>
      </div>
    </Section>
  );
}

function LeftColumn({ topSkills }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Skills */}
      <TopSkillsCard topSkills={topSkills} />

      {/* Info Cards */}
      <div className="mt-6 space-y-4">
        <LocationCard />
        <CurrentRoleCard />
        <EducationCard />
      </div>
    </motion.div>
  );
}

function RightColumn() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <LanguagesCard />
      <PortfolioHighlights />
    </motion.div>
  );
}

function TopSkillsCard({ topSkills }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
        <FaStar className="h-5 w-5 text-yellow-500" />
        Top Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {topSkills.map(skill => {
          const Icon = iconMap[skill.icon];
          return (
            <Badge key={skill.name} variant="primary" size="md" icon={Icon}>
              {skill.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

function LocationCard() {
  return (
    <InfoCard
      icon={<FaMapMarkerAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
      iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      label="Location"
      value={profileData.location}
    />
  );
}

function CurrentRoleCard() {
  if (!profileData.currentRole) return null;

  return (
    <InfoCard
      icon={<FaBriefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
      iconBgColor="bg-purple-100 dark:bg-purple-900/30"
      label="Current Role"
      value={`${profileData.currentRole.title} ${profileData.currentRole.company ? 'at' : ''} ${profileData.currentRole.company}`}
    />
  );
}

function EducationCard() {
  const education = educationData.education[0];

  if (!education) return null;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
        <FaGraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
        <p className="font-medium text-slate-900 dark:text-white">
          {education.degree} in {education.field}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{education.institution}</p>
      </div>
    </div>
  );
}

function InfoCard({ icon, iconBgColor, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className={`rounded-lg p-3 ${iconBgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function LanguagesCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Languages I Speak
      </h3>
      <div className="flex flex-wrap gap-2">
        {profileData.languages.map(lang => (
          <span
            key={lang}
            className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

function PortfolioHighlights() {
  const stats = [
    {
      value: String(projectsData.projects.length).padStart(2, '0'),
      label: 'Projects Built',
      description: 'Live portfolio projects with detailed case studies and visuals.',
      icon: FaProjectDiagram,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
    },
    {
      value: String(experienceData.experiences.length).padStart(2, '0'),
      label: 'Professional Roles',
      description: 'Real-world internship experience across product and UI work.',
      icon: FaCubes,
      gradient: 'from-purple-600 via-violet-500 to-fuchsia-500',
    },
    {
      value: String(certificationsData.certifications.length + achievementsData.achievements.length).padStart(2, '0'),
      label: 'Credentials & Honors',
      description: 'Certificates and achievements that support the work history.',
      icon: FaCertificate,
      gradient: 'from-emerald-600 via-green-500 to-teal-500',
    },
    {
      value: String(skillsData.categories.length).padStart(2, '0'),
      label: 'Skill Pillars',
      description: 'Languages, frontend, backend, databases, and tooling.',
      icon: FaLayerGroup,
      gradient: 'from-orange-600 via-amber-500 to-yellow-500',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2">
        <FaStar className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Portfolio Highlights
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl bg-linear-to-br ${stat.gradient} p-5 text-white shadow-lg`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-sm font-semibold text-white/90">{stat.label}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/85">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
