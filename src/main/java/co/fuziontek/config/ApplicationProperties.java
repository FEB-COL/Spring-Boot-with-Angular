package co.fuziontek.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Geargateway.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    //se va quemar las Url de alfresco OJO
    private String AlfrescoAddress;

    private String AlfrescoPort;
    private String MaxCounterCustomField;

    public String getAlfrescoAddress() {
//        return "34.73.130.250";//AlfrescoAddress;
        return "34.73.6.168";
    }

    public void setAlfrescoAddress(String alfrescoAddress) {
        AlfrescoAddress = alfrescoAddress;
    }

    public String getAlfrescoPort() {
        return "8080";//AlfrescoPort;
    }

    public void setAlfrescoPort(String alfrescoPort) {
        AlfrescoPort = alfrescoPort;
    }

    public String getMaxCounterCustomField() {
        return "4";//MaxCounterCustomField;
    }

    public void setMaxCounterCustomField(String maxCounterCustomField) {
        MaxCounterCustomField = maxCounterCustomField;
    }
}
