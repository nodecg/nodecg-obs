import * as OBSWebSocket from 'obs-websocket-js';
import { NodeCG, Replicant, Logger } from 'nodecg/types/server';
import { Websocket } from '../types/schemas/websocket';
import { ProgramScene } from '../types/schemas/programScene';
import { PreviewScene } from '../types/schemas/previewScene';
import { SceneList } from '../types/schemas/sceneList';
import { Transitioning } from '../types/schemas/transitioning';
import { StudioMode } from '../types/schemas/studioMode';
interface TransitionOptions {
    'with-transition': {
        name: string;
        duration?: number;
    };
}
export interface Hooks {
    preTransition(transitionOpts: TransitionOptions): TransitionOptions | void | Promise<TransitionOptions> | Promise<void>;
}
export declare class OBSUtility extends OBSWebSocket {
    namespace: string;
    hooks: Partial<Hooks>;
    replicants: {
        websocket: Replicant<Websocket>;
        programScene: Replicant<ProgramScene>;
        previewScene: Replicant<PreviewScene>;
        sceneList: Replicant<SceneList>;
        transitioning: Replicant<Transitioning>;
        studioMode: Replicant<StudioMode>;
    };
    log: Logger;
    private _ignoreConnectionClosedEvents;
    private _reconnectInterval;
    private _connected;
    constructor(nodecg: NodeCG, opts?: {
        namespace?: string;
        hooks?: Partial<Hooks>;
    });
    /**
     * Attemps to connect to OBS Studio via obs-websocket using the parameters
     * defined in the ${namespace}:websocket Replicant.
     * @returns {Promise}
     */
    _connectToOBS(): Promise<[void | {
        messageId: string;
        status: "ok";
        "current-scene": string;
        scenes: OBSWebSocket.Scene[];
    }, void | {
        messageId: string;
        status: "ok";
        name: string;
        sources: OBSWebSocket.Source[];
    }, void, void]>;
    /**
     * Attempt to reconnect to OBS, and keep re-trying every 5s until successful.
     * @private
     */
    _reconnectToOBS(): void;
    /**
     * Gets the current scene info from OBS, and detemines what layout is active based
     * on the sources present in that scene.
     * @returns {Promise}
     */
    _fullUpdate(): Promise<[void | {
        messageId: string;
        status: "ok";
        "current-scene": string;
        scenes: OBSWebSocket.Scene[];
    }, void | {
        messageId: string;
        status: "ok";
        name: string;
        sources: OBSWebSocket.Source[];
    }, void, void]>;
    /**
     * Updates the sceneList replicant with the current value from OBS.
     * By extension, it also updates the customSceneList replicant.
     * @returns {Promise}
     */
    _updateScenesList(): Promise<void | {
        messageId: string;
        status: "ok";
        "current-scene": string;
        scenes: OBSWebSocket.Scene[];
    }>;
    /**
     * Updates the programScene replicant with the current value from OBS.
     * @returns {Promise}
     */
    _updateProgramScene(): Promise<void | {
        messageId: string;
        status: "ok";
        name: string;
        sources: OBSWebSocket.Source[];
    }>;
    /**
     * Updates the previewScene replicant with the current value from OBS.
     */
    _updatePreviewScene(): Promise<void>;
    /**
     * Updates the studioMode replicant with the current value from OBS.
     * @returns {Promise.<T>|*}
     * @private
     */
    _updateStudioMode(): Promise<void>;
    /**
     * Transitions from preview to program with the desired transition.
     * Has an optional hook for overriding which transition is used.
     * @param [transitionName] - The name of the transition to use.
     * If not provided, will use whatever default transition is selected in this.
     * The transition choice can be overridden by a user code hook.
     * @param [transitionDuration] - The duration of the transition to use.
     * If not provided, will use whatever default transition duration is selected in this.
     * The transition duration can be overridden by a user code hook.
     * @returns {Promise}
     */
    _transition(transitionName?: string, transitionDuration?: number): Promise<void>;
    /**
     * Clears the list of used namespaces, allowing any previously used
     * namespace to be re-used. Used internally for testing, should
     * not be used in production.
     * @private
     */
    static _clearUsedNamespaces(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map