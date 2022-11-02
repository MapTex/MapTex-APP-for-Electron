import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mapbox/mr-ui/icon';

export type Entry = { name: string; content: ReactElement; route: string };

export interface Section {
  name: string;
  entries: Array<Entry>;
}

interface Props {
  sections: Array<Section>;
}

function SidebarSection({ name, entries }: Section): ReactElement {
  const id = name.replace(/ /g, '-').toLowerCase();
  return (
    <div className="mt12">
      <a href={`#${id}`}>
        <h2 className="txt-h5 mb6 color-blue-on-hover color-gray">{name}</h2>
      </a>
      <ul className="flex flex--wrap block-mm">
        {entries.map(({ name, route }: { name: string }) => (
          <li key={name}>
            <Link to={route}>
              <a
                href={`#${name.toLowerCase()}`}
                className="pr6 py3 block txt-bold color-blue-on-hover"
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar({ sections }: Props): ReactElement {
  return (
    <div>
      <div className="border-b border--gray-light color-gray color-blue-on-hover pb12">
        <span className="mt6 flex flex--center-cross txt-s">
          <span className="mr6">
            <Icon name="github" />
          </span>
          瓦片工具
        </span>
      </div>
      <div className="pt12 txt-s">
        {sections.map(
          ({ name, entries }: Section): ReactElement => (
            <SidebarSection key={name} name={name} entries={entries} />
          )
        )}
      </div>
    </div>
  );
}
