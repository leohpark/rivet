import { useState, type FC } from 'react';
import { type SharedEditorProps } from './SharedEditorProps';
import { type ChartNode, type StringListEditorDefinition } from '@ironclad/rivet-core';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { Field } from '@atlaskit/form';
import { css } from '@emotion/react';
import { ReactComponent as CrossIcon } from 'majesticons/line/multiply-line.svg';

const styles = css`
  .string-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .string-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .add-item {
    margin-top: 8px;
  }

  .delete-item {
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

type StringListEditorProps = SharedEditorProps & {
  editor: StringListEditorDefinition<ChartNode>;
};

export const StringListEditor: FC<StringListEditorProps> = ({ node, isReadonly, isDisabled, onChange, editor }) => {
  const data = node.data as Record<string, unknown>;
  const stringList = data[editor.dataKey] as string[] | undefined;
  const [items, setItems] = useState<string[]>(stringList || []);

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  return (
    <StringList
      label={editor.label}
      dataKey={editor.dataKey}
      isReadonly={isReadonly}
      isDisabled={isDisabled}
      stringList={items}
      onAddItem={handleAddItem}
      onDeleteItem={handleDeleteItem}
      onItemChange={handleItemChange}
    />
  );
};

type StringListProps = {
  label: string;
  dataKey: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  stringList: string[];
  onAddItem: () => void;
  onDeleteItem: (index: number) => void;
  onItemChange: (index: number, value: string) => void;
};

export const StringList: FC<StringListProps> = ({
  label,
  dataKey,
  isReadonly,
  isDisabled,
  stringList,
  onAddItem,
  onDeleteItem,
  onItemChange,
}) => {
  return (
    <div css={styles}>
      <Field name={dataKey} label={label} isDisabled={isDisabled}>
        {({ fieldProps }) => (
          <>
            <div className="string-list">
              {stringList.map((item, index) => (
                <div key={index} className="string-item">
                  <TextField
                    {...fieldProps}
                    value={item}
                    onChange={(e) => onItemChange(index, (e.target as HTMLInputElement).value)}
                    isDisabled={isDisabled}
                    isReadOnly={isReadonly}
                    placeholder="Item"
                    style={{ marginRight: '8px' }}
                  />
                  <Button
                    className="delete-item"
                    appearance="subtle"
                    onClick={() => onDeleteItem(index)}
                    isDisabled={isDisabled || isReadonly}
                    style={{ marginRight: '8px' }}
                  >
                    <CrossIcon />
                  </Button>
                </div>
              ))}
            </div>
            <Button className="add-item" appearance="primary" onClick={onAddItem} isDisabled={isDisabled || isReadonly}>
              Add
            </Button>
          </>
        )}
      </Field>
    </div>
  );
};
