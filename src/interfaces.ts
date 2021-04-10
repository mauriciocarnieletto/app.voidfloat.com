export interface ComponentForm<ModelData> {
  onBeforeSubmit?(data?: ModelData): void;
  onSubmit?(data?: ModelData): void;
  onAfterSubmit?(data?: ModelData): void;
}
